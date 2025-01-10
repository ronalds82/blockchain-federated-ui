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
  constructor(private http: HttpClient) {}

  uploadModel(file: File | null, hospitalId: number): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${baseUrl}/upload`, { file, hospitalId });
  }

  downloadModel(modelId: number): Observable<ModelResponse> {
    return this.http.post<ModelResponse>(`${baseUrl}/download`, { modelId });
  }
}
