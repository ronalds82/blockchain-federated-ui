import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { Observable } from 'rxjs';
import { HospitalService } from '../../services/hospital.service';
import { VoteViewComponent } from './view/vote-view.component';
import { VoteValue } from '../../enums/vote-value.enum';
import { ethers } from '../../../../backend/sample_from_tutorial/ethers-5.6.esm.min';
import { contractAddress as hospitalsContractAddress, abi as hospitalsAbi } from '../../../../backend/constants/hopsital_contract.js'

@Component({
  selector: 'app-vote',
  imports: [CommonModule, VoteViewComponent],
  templateUrl: './vote.component.html'
})
export class VoteComponent {
  hospitals$: Observable<Hospital[]> | null = null;
  hospital$: Observable<Hospital | null>;
  provider: ethers.providers.Web3Provider | null = null;
  hospitalsContract: ethers.Contract | null = null;
  voteInProgress = false;

  constructor(private hospitalService: HospitalService) {
    this.hospitals$ = this.hospitalService.getHospitals();
    this.hospital$ = this.hospitalService.hospital$;
  }

  ngOnInit(): void {
    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.hospitalsContract = new ethers.Contract(hospitalsContractAddress, hospitalsAbi, this.provider);
    }
  }

  onVote(vote: VoteValue): void {
    this.voteInProgress = true;
    vote === VoteValue.ACCEPT ? this.onAccept() : this.onDeny();
    this.voteInProgress = false;
  }

  async onDeny(): Promise<void> {
    if (this.provider && this.hospitalsContract) {
      try {
        const signer = this.provider.getSigner();
        const signedContract = this.hospitalsContract.connect(signer);
        const txResponse = await signedContract.setVote(VoteValue.DENY);

        let selectedHospital = this.hospitalService.getHospitalFromStorage();
        if (selectedHospital) {
          selectedHospital.vote = VoteValue.DENY;
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
    return;
  }

  async onAccept(): Promise<void> {
    if (this.provider && this.hospitalsContract) {
      try {
        const signer = this.provider.getSigner();
        const signedContract = this.hospitalsContract.connect(signer);
        const txResponse = await signedContract.setVote(VoteValue.ACCEPT);

        let selectedHospital = this.hospitalService.getHospitalFromStorage();
        if (selectedHospital) {
          selectedHospital.vote = VoteValue.ACCEPT;
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
    return;
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
