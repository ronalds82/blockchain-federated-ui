import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Hospital } from '../models/hospital.model';
import { baseUrl } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  hospital$ = new Subject<Hospital>();

  constructor(private http: HttpClient) {}

  getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${baseUrl}/hospitals`);
  }

  setHospital(hospital: Hospital): void {
    this.hospital$.next(hospital);
  }
}
