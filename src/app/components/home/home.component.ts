import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalService } from '../../services/hospital.service';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.model';
import { contractAddress as trainingStatusContractAddress, abi as trainingStatusAbi } from '../../../../backend/constants/training_status_contract.js'
import { contractAddress as hospitalsContractAddress, abi as hospitalsAbi } from '../../../../backend/constants/hopsital_contract.js'
import { ethers } from '../../../../backend/sample_from_tutorial/ethers-5.6.esm.min';
import { HomeConnectComponent } from './home-connect/home-connect.component';
import { HomeParticipantsComponent } from './home-participants/home-participants.component';
import { RoundStatus } from '../../enums/round-status.enum';
import { Role } from '../../enums/role.enum';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, HomeConnectComponent, HomeParticipantsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  readonly RoundStatus = RoundStatus;

  currentStatus: RoundStatus | null = null;
  provider: ethers.providers.Web3Provider | null = null;
  contract: ethers.Contract | null = null;
  hospitalsContract: ethers.Contract | null = null;
  hospitals$: Observable<Hospital[]> | null = null;
  hospital$: Observable<Hospital | null>;
  actionInProgress = false;

  constructor(private hospitalService: HospitalService) {
    this.hospitals$ = this.getHospitals();
    this.hospital$ = this.hospitalService.hospital$;
  }

  ngOnInit(): void {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.contract = new ethers.Contract(trainingStatusContractAddress, trainingStatusAbi, this.provider);
      this.hospitalsContract = new ethers.Contract(hospitalsContractAddress, hospitalsAbi, this.provider);
      this.onGetStatus();
    } 
  }

  async onGetStatus(): Promise<void> {
    this.actionInProgress = true;

    try {
      const status = await this.contract.getStatus();
      this.currentStatus = status;
      console.log('Current Status:', status);
    } catch (error) {
      console.error('Error getting status:', error);
    }

    this.actionInProgress = false;
  }

  async onUpdateStatus(selectedStatus: RoundStatus): Promise<void> {
    this.actionInProgress = true;

    try {
      const signer = this.provider.getSigner();
      const signedContract = this.contract.connect(signer);
      const txResponse = await signedContract.updateStatus(selectedStatus);
      await this.listenForTransactionMine(txResponse);
      console.log('Status updated');
      this.onGetStatus();
    } catch (error) {
      console.error('Error updating status:', error);
    }

    this.actionInProgress = false;
  }

  async onJoin(): Promise<void> {
    this.actionInProgress = true;

    if (this.provider && this.hospitalsContract) {
      try {
        const signer = this.provider.getSigner();
        const signedContract = this.hospitalsContract.connect(signer);
        const txResponse = await signedContract.setRole(Role.PARTICIPANT);

        let selectedHospital = this.hospitalService.getHospitalFromStorage();
        if (selectedHospital) {
          selectedHospital.role = Role.PARTICIPANT;
          this.hospitalService.setHospital(selectedHospital);
        }

        await this.listenForTransactionMine(txResponse);
        this.hospitals$ = this.getHospitals();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
    
    this.actionInProgress = false;
    return;
  }

  async onLeave(): Promise<void> {
    this.actionInProgress = true;

    if (this.provider && this.hospitalsContract) {
      try {
        const signer = this.provider.getSigner();
        const signedContract = this.hospitalsContract.connect(signer);
        const txResponse = await signedContract.setRole(Role.NULL);

        let selectedHospital = this.hospitalService.getHospitalFromStorage();
        if (selectedHospital) {
          selectedHospital.role = Role.NULL;
          this.hospitalService.setHospital(selectedHospital);
        }

        await this.listenForTransactionMine(txResponse);
        this.hospitals$ = this.getHospitals();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
    
    this.actionInProgress = false;
    return;
  }

  async onInitializeRound(): Promise<void> {
    try {
      this.onUpdateStatus(RoundStatus.WAITING_FOR_PARTICPANTS);
      this.onJoin();
    } catch (error) {
      console.error('Error initializing round:', error);
    }
  }

  async onStartTraining(addresses: string[]): Promise<void> {
    try {
      const hospitals = this.getHospitals();
      // Make at least half of the participants miners, the rest trainers; roles assigned randomly
      const miners = Array(Math.floor(addresses.length/2)).fill(Role.TRAINER).concat(Array(Math.ceil(addresses.length/2)).fill(Role.MINER));
      const shuffledMiners = miners.sort((a, b) => 0.5 - Math.random());

      const signer = this.provider.getSigner();
      const signedContract = this.hospitalsContract.connect(signer);
      const txResponse = await signedContract.setRolesForAddresses(addresses, shuffledMiners);
      await this.listenForTransactionMine(txResponse);
      this.onUpdateStatus(RoundStatus.START_TRAINING);
    } catch (error) {
      console.error('Error starting training:', error);
    }
  }

  private listenForTransactionMine(transactionResponse: ethers.providers.TransactionResponse): Promise<void> {
    console.log(`Mining ${transactionResponse.hash}`);
    return new Promise((resolve) => {
      this.provider?.once(transactionResponse.hash, (transactionReceipt: { confirmations: any; }) => {
        console.log(`Completed with ${transactionReceipt.confirmations} confirmations.`);
        resolve();
      });
    });
  }

  private getHospitals(): Observable<Hospital[]> {
    return this.hospitalService.getHospitals();
  }
}
