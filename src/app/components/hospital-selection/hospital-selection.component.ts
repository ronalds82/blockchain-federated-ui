import { Component, OnInit } from '@angular/core';
import { Hospital, HospitalDetails } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hospital-selection',
  imports: [CommonModule],
  templateUrl: './hospital-selection.component.html',
  styleUrls: ['./hospital-selection.component.less'],
})
export class HospitalSelectionComponent implements OnInit {
  hospitals: Hospital[] = [];
  selectedHospital: HospitalDetails | null = null;

  constructor(private hospitalService: HospitalService) {}

  ngOnInit(): void {
    this.hospitalService.getHospitals().subscribe((data) => {
      this.hospitals = data;
    });
  }

  onHospitalSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const hospitalId = Number(target.value);
    this.hospitalService.getHospitalById(hospitalId).subscribe((data) => {
      this.selectedHospital = data;
    });
  }
}