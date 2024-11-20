import { Component, OnInit } from '@angular/core';
import { GlobalModel } from '../../models/global-model.model';
import { ModelService } from '../../services/model.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-models',
  imports: [CommonModule],
  templateUrl: './global-models.component.html',
  styleUrls: ['./global-models.component.less'],
})
export class GlobalModelsComponent implements OnInit {
  models: GlobalModel[] = [];

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.modelService.getModels().subscribe((data) => {
      this.models = data;
    });
  }

  downloadModel(modelId: string): void {
    const data = { hospitalId: 1, modelId };
    this.modelService.downloadModel(data).subscribe((response) => {
      window.open(response.fileUrl, '_blank');
    });
  }
}
