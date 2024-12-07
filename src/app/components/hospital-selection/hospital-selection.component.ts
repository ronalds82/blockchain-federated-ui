import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospital-selection',
  imports: [CommonModule],
  templateUrl: './hospital-selection.component.html'
})
export class HospitalSelectionComponent implements OnInit {
  hospitals: Hospital[] = [];

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.hospitalService.getHospitals().subscribe((data) => {
      this.hospitals = data;
    });
  }

  onHospitalSelect(hospital: Hospital): void {
    this.hospitalService.setHospital(hospital);
  }
}