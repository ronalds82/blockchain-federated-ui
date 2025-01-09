import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ModelService} from '../../services/model.service';

@Component({
  selector: 'app-model-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './model-upload.component.html',
})
export class ModelUploadComponent {
  file: File | null = null;
  uploadSuccess = false;
  statusMessage = '';
  ipfsCid: string | null = null;

  constructor(
    private modelService: ModelService,
  ) {}

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    } else {
      this.file = null;
    }
  }

  async uploadToIPFS(): Promise<void> {
    if (!this.file) {
      this.statusMessage = 'No file selected for IPFS upload!';
      return;
    }

    this.modelService.uploadToIPFS(this.file).subscribe({
      next: (response) => {
        if (response.success) {
          this.ipfsCid = response.cid;
          this.statusMessage = `File uploaded to IPFS! CID: ${response.cid}`;
          this.uploadSuccess = true;
        } else {
          this.statusMessage = 'Error uploading file to IPFS.';
          this.uploadSuccess = false;
        }
      },
      error: (err) => {
        console.error('Backend upload error:', err);
        this.statusMessage = 'Error communicating with backend.';
        this.uploadSuccess = false;
      },
    });
  }
}
