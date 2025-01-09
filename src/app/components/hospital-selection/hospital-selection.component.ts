import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { paths } from '../../app.routes';
import { FormsModule } from '@angular/forms';
import { ethers } from '../../../../backend/sample_from_tutorial/ethers-5.6.esm.min';
import { finalize } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-hospital-selection',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './hospital-selection.component.html'
})
export class HospitalSelectionComponent implements OnInit {
  hospitalName: string = '';
  hospitalRole: number = 0;
  hospitals: Hospital[] = [];
  selectedHospital: Hospital | null = null;
  provider: ethers.providers.Web3Provider | null = null;
  metaMaskNotInstalled = false;
  hospitalsLoading = false;
  actionInProgress = false;

  constructor(
    private hospitalService: HospitalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHospitals();

    if (window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      this.metaMaskNotInstalled = true;
    }
  }

  private loadHospitals(): void {
    this.hospitalsLoading = true;

    this.hospitalService.getHospitals()
    .pipe(finalize(() => this.hospitalsLoading = false))
    .subscribe({
      next: (data) => {
        this.hospitals = this.getUniqueHospitals(data);
      },
      error: (err) => {
        console.error('Error fetching hospitals:', err);
      }
    });
  }

  onRegisterHospital(): void {
    this.actionInProgress = true;

    const hospital: Hospital = {
      hospitalWalletAddress: '',
      name: this.hospitalName,
      role: this.hospitalRole,
      vote: 0,
    };

    this.hospitalService.createHospital(hospital)
    .pipe(finalize(() => this.actionInProgress = false))
    .subscribe({
      next: (tx) => {
        console.log('Transaction sent, hash:', tx.hash);

        tx.wait().then((receipt: any) => {
          console.log('Transaction mined:', receipt);
          this.loadHospitals();
        });

        this.connectToMetaMask();
      },
      error: (err) => {
        console.error('Error creating hospital:', err);
      },
    });
  }

  async onHospitalSelect(event: Event): Promise<void> {
    this.actionInProgress = true;

    const selectElement = event.target as HTMLSelectElement;
    const selectedAddress = selectElement.value;

    const selectedHospital = this.hospitals.find(
      (hospital) => hospital.hospitalWalletAddress === selectedAddress
    );

    if (selectedHospital) {
      this.selectedHospital = selectedHospital;
      this.hospitalService.setHospital(selectedHospital);
      this.connectToMetaMask();
      this.actionInProgress = false;
      this.router.navigate([paths.HomePath]);
    } else {
      console.error('Selected hospital not found');
    }
  }

  private async connectToMetaMask(): Promise<void> {
    if (this.provider) {
      try {
        await this.provider.send('eth_requestAccounts', []);
        const accounts = await this.provider.listAccounts();
        console.log('Connected accounts:', accounts);
      } catch (error) {
        console.error('Error connecting:', error);
      }
    }
  }

  private getUniqueHospitals(hospitals: Hospital[]): Hospital[] {
    const seen = new Set();
    return hospitals.filter(hospital => {
        const value = hospital['hospitalWalletAddress'];
        if (seen.has(value)) {
          return false;
        } else {
          seen.add(value);
          return true;
        }
    });
  }
}
