import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalService } from '../../services/hospital.service';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.model';
import { contractAddress as trainingStatusContractAddress, abi as trainingStatusAbi } from '../../../../backend/constants/training_status_contract.js'
import { contractAddress, abi } from '../../../../backend/constants/participants_contract.js';
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
  readonly RoundStatus = RoundStatus;

  connectButtonLabel: string = 'Connect to MetaMask';
  currentStatus: RoundStatus | null = null;
  provider: ethers.providers.Web3Provider | null = null;
  hospitalProvider: ethers.providers.Web3Provider | null = null;
  contract: ethers.Contract | null = null;
  hospitalContract: ethers.Contract | null = null;
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
      this.hospitalProvider = new ethers.providers.Web3Provider(window.ethereum);
      this.hospitalContract = new ethers.Contract(contractAddress, abi, this.provider);
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
  
  async onJoin(name: string, role: number): Promise<void> {
    if (this.hospitalProvider && this.hospitalContract) {
      try {
        const signer = this.hospitalProvider.getSigner();
        const signedContract = this.hospitalContract.connect(signer);
        const txResponse = await signedContract.join(name, role);
        console.log('Transaction sent:', txResponse.hash);
  
        await txResponse.wait(); // Wait for the transaction to be mined
        console.log('Joined successfully');
        alert('Joined successfully!');
      } catch (error) {
        console.error('Error during join:', error);
        alert('Failed to join. Please check the console for details.');
      }
    } else {
      alert('Please install MetaMask or ensure you are connected to the blockchain.');
    }
  }

  async onLeave(): Promise<void> {
    if (this.hospitalProvider && this.hospitalContract) {
      try {
        const signer = this.hospitalProvider.getSigner();
        const signedContract = this.hospitalContract.connect(signer);
        const txResponse = await signedContract.leave();
        console.log('Transaction sent:', txResponse.hash);
  
        await txResponse.wait(); // Wait for the transaction to be mined
        console.log('Left successfully');
        alert('Left successfully!');
      } catch (error) {
        console.error('Error during leave:', error);
        alert('Failed to leave. Please check the console for details.');
      }
    } else {
      alert('Please install MetaMask or ensure you are connected to the blockchain.');
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
