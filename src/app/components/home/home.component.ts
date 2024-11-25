import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundStatus } from '../../enums/round-status.enum';
import { HospitalService } from '../../services/hospital.service';
import { Observable } from 'rxjs';
import { HospitalDetails } from '../../models/hospital.model';
import { FormsModule } from '@angular/forms';
import { abi, contractAddress } from '../../../../backend/sample_from_tutorial/new_contract.js';
import { ethers } from '../../../../backend/sample_from_tutorial/ethers-5.6.esm.min';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  connectButtonLabel: string = 'Connect to MetaMask';
  currentStatus: string = '';
  selectedStatus: string = RoundStatus.None;
  statusOptions: string[] = Object.values(RoundStatus);

  provider: ethers.providers.Web3Provider | null = null;
  contract: ethers.Contract | null = null;

  hospitals$: Observable<HospitalDetails[]> | null = null;

  constructor(private hospitalService: HospitalService) {
    this.hospitals$ = this.getHospitals();
  }

  ngOnInit(): void {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.contract = new ethers.Contract(contractAddress, abi, this.provider);
    } else {
      this.connectButtonLabel = 'Please install MetaMask';
    }
  }

  async onConnectButtonClick(): Promise<void> {
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

  async onGetStatusButtonClick(): Promise<void> {
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
  
  async onInitializeRoundClick(): Promise<void> {
    return;
  }

  async onUpdateStatusButtonClick(): Promise<void> {
    if (this.provider && this.contract) {
      try {
        const signer = this.provider.getSigner();
        const signedContract = this.contract.connect(signer);
        const txResponse = await signedContract.updateStatus(this.selectedStatus);

        await this.listenForTransactionMine(txResponse);
        console.log('Status updated');
        this.onGetStatusButtonClick();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    } else {
      alert('Please install MetaMask');
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

  private getHospitals(): Observable<HospitalDetails[]> {
    return this.hospitalService.getHospitals();
  }
}
