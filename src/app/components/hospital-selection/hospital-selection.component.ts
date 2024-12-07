import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { paths } from '../../app.routes';

@Component({
  selector: 'app-hospital-selection',
  imports: [CommonModule],
  templateUrl: './hospital-selection.component.html'
})
export class HospitalSelectionComponent implements OnInit {
  hospitals: Hospital[] = [];
  selectedHospital: Hospital | null = null;

  constructor(
    private hospitalService: HospitalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hospitalService.getHospitals().subscribe((data) => {
      this.hospitals = data;
    });
  }

  onHospitalSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedHospital = this.hospitals.find(hospital => hospital.id === Number(selectElement.value));

    if (selectedHospital) {
      this.selectedHospital = selectedHospital;
      this.hospitalService.setHospital(selectedHospital);
      this.router.navigate([paths.HomePath]);
    } else {
      console.error('Selected hospital not found');
    }
  }
}
