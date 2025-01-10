import { Component, OnInit } from '@angular/core';
import { GlobalModel } from '../../models/global-model.model';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-download',
  imports: [CommonModule],
  templateUrl: './model-download.component.html'
})
export class ModelDownloadComponent implements OnInit {
  models: GlobalModel[] = [];

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
  }

  downloadModel(id: number): void {
    this.modelService.downloadModel(id).subscribe((response) => {
      window.open(response.fileUrl, '_blank');
    });
  }
}
