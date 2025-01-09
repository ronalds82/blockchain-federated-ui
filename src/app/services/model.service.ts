import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalModel } from '../models/global-model.model';
import { baseUrl } from '../../environment';
import { CustomResponse } from '../models/custom-response.model';
import { ModelResponse } from '../models/model-response.model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private backendBaseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getModels(): Observable<GlobalModel[]> {
    return this.http.get<GlobalModel[]>(`${baseUrl}/models`);
  }

  uploadModel(file: File | null, hospitalId: number): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${baseUrl}/upload`, { file, hospitalId });
  }

  downloadModel(modelId: number): Observable<ModelResponse> {
    return this.http.post<ModelResponse>(`${baseUrl}/download`, { modelId });
  }

  getIPFSModels(): Observable<GlobalModel[]> {
    return this.http.get<GlobalModel[]>(`${this.backendBaseUrl}/models`);
  }

  uploadToIPFS(file: File): Observable<{ success: boolean; cid: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ success: boolean; cid: string }>(
      `${this.backendBaseUrl}/upload-to-ipfs`,
      formData
    );
  }
}
