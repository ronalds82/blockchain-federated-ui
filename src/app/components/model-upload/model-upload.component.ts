import { Component } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-upload',
  imports: [CommonModule],
  templateUrl: './model-upload.component.html',
  styleUrls: ['./model-upload.component.less'],
})
export class ModelUploadComponent {
  uploadSuccess = false;

  constructor(private modelService: ModelService) {}

  uploadModel(file: any): void {
    const data = { hospitalId: 1, modelId: 'model_v3', file: file.target.files[0] };
    this.modelService.uploadModel(data).subscribe((response) => {
      this.uploadSuccess = response.success;
    });
  }
}
