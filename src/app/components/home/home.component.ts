import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalService } from '../../services/hospital.service';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.model';
import { contractAddress as trainingStatusContractAddress, abi as trainingStatusAbi } from '../../../../backend/constants/training_status_contract.js'
import { ethers } from '../../../../backend/sample_from_tutorial/ethers-5.6.esm.min';
import { HomeConnectComponent } from './home-connect/home-connect.component';
import { HomeParticipantsComponent } from './home-participants/home-participants.component';
import { RoundStatus } from '../../enums/round-status.enum';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, HomeConnectComponent, HomeParticipantsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  connectButtonLabel: string = 'Connect to MetaMask';
  currentStatus: string = '';
  provider: ethers.providers.Web3Provider | null = null;
  contract: ethers.Contract | null = null;
  hospitals$: Observable<Hospital[]> | null = null;
  hospital$: Observable<Hospital | null>;

  constructor(private hospitalService: HospitalService) {
    this.hospitals$ = this.getHospitals();
    this.hospital$ = this.hospitalService.hospital$;
  }

  ngOnInit(): void {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.contract = new ethers.Contract(trainingStatusContractAddress, trainingStatusAbi, this.provider);
    } else {
      this.connectButtonLabel = 'Please install MetaMask';
    }
  }

  async onConnect(): Promise<void> {
    if (this.provider) {
      try {
        await this.provider.send('eth_requestAccounts', []);
        this.connectButtonLabel = 'Connected to MetaMask';
        const accounts = await this.provider.listAccounts();
        console.log('Connected accounts:', accounts);
      } catch (error) {
        console.error('Error connecting:', error);
      }
    }
  }

  async onGetStatus(): Promise<void> {
    if (this.contract) {
      try {
        const status = await this.contract.getStatus();
        this.currentStatus = status;
        console.log('Current Status:', status);
      } catch (error) {
        console.error('Error getting status:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  }

  async onInitializeRound(): Promise<void> {
    return; // TODO: implement after BE is done
  }

  async onUpdateStatus(selectedStatus: RoundStatus): Promise<void> {
    if (this.provider && this.contract) {
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
    } else {
      alert('Please install MetaMask');
    }
  }
  
  async onJoin(): Promise<void> {
    return; // TODO: implement after BE is done
  }

  async onLeave(): Promise<void> {
    return; // TODO: implement after BE is done
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
