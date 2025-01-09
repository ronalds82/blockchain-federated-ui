import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { GlobalModel } from '../../models/global-model.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-model-download',
  imports: [CommonModule],
  templateUrl: './model-download.component.html',
})
export class ModelDownloadComponent implements OnInit {
  models: GlobalModel[] = [];

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.modelService.getModels().subscribe((data) => {
      this.models = data;
    });
  }

  downloadModel(cid: string): void {
    const ipfsUrl = `https://ipfs.io/ipfs/${cid}`;
    window.open(ipfsUrl, '_blank');
  }
}
