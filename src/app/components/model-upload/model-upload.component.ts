import { Component } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-model-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './model-upload.component.html'
})
export class ModelUploadComponent {
  file: File | null = null;
  hospital$: Observable<Hospital> | null = null;
  uploadSuccess = false;

  constructor(
    private modelService: ModelService,
    private hospitalService: HospitalService
  ) {
    this.hospital$ = this.hospitalService.hospital$;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    } else {
      this.file = null;
    }
  }

  uploadModel(hospital: Hospital): void {
    this.modelService.uploadModel(this.file, hospital.id).subscribe(() => this.uploadSuccess = true);
  }
}
