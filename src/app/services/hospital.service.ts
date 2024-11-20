import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital, HospitalDetails } from '../models/hospital.model';
import { baseUrl } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${baseUrl}/hospitals`);
  }

  getHospitalById(id: number): Observable<HospitalDetails> {
    return this.http.get<HospitalDetails>(`${baseUrl}/hospital/${id}`);
  }
}
