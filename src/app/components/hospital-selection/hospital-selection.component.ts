import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { paths } from '../../app.routes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospital-selection',
  imports: [CommonModule, FormsModule],
  templateUrl: './hospital-selection.component.html'
})
export class HospitalSelectionComponent implements OnInit {
  hospitalName: string = '';
  hospitalRole: number = 0;

  hospitals: Hospital[] = [];
  selectedHospital: Hospital | null = null;

  constructor(
    private hospitalService: HospitalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadHospitals();
  }

  private loadHospitals(): void {
    this.hospitalService.getHospitals().subscribe({
      next: (data) => {
        this.hospitals = data;
      },
      error: (err) => {
        console.error('Error fetching hospitals:', err);
      }
    });
  }

  // onRegisterHospital() - When the user clicks "Register"
  // we build a Hospital object and call createHospital()
  onRegisterHospital(): void {
    const hospital: Hospital = {
      hospitalWalletAddress: '', // The contract will set this on-chain based on msg.sender
      name: this.hospitalName,
      role: this.hospitalRole,
      vote: 0, // or 0
    };

    // Call our service to create the hospital on-chain
    this.hospitalService.createHospital(hospital).subscribe({
      next: (tx) => {
        console.log('Transaction sent, hash:', tx.hash);

        tx.wait().then((receipt: any) => {
          console.log('Transaction mined:', receipt);
          // Refresh the hospital list
          this.loadHospitals();
        });
      },
      error: (err) => {
        console.error('Error creating hospital:', err);
      },
    });
  }

  /**
   * onHospitalSelect() - Called when the user selects a hospital from the dropdown
   */
  onHospitalSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedAddress = selectElement.value;

    // ------------------ CHANGED KEY BELOW ------------------
    // We now compare hospital.hospitalAddress (not hospitalWalletAddress)
    const selectedHospital = this.hospitals.find(
      (hospital) => hospital.hospitalWalletAddress === selectedAddress
    );

    if (selectedHospital) {
      this.selectedHospital = selectedHospital;
      this.hospitalService.setHospital(selectedHospital);

      // Optionally navigate somewhere, e.g. Home path
      this.router.navigate([paths.HomePath]);
    } else {
      console.error('Selected hospital not found');
    }
  }
}
