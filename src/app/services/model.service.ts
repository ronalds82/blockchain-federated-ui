import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalModel } from '../models/global-model.model';
import { baseUrl } from '../../environment';
import { CustomResponse } from '../models/custom-response.model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor(private http: HttpClient) {}

  getModels(): Observable<GlobalModel[]> {
    return this.http.get<GlobalModel[]>(`${baseUrl}/models`);
  }

  uploadModel(file: File | null, hospitalId: number): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${baseUrl}/upload`, { file, hospitalId });
  }

  downloadModel(modelId: number): Observable<string> {
    return this.http.post<string>(`${baseUrl}/download`, { modelId });
  }
}
