import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Hospital } from '../models/hospital.model';
import { baseUrl } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private selectedHospitalSubject = new BehaviorSubject<Hospital | null>(this.getHospitalFromStorage());

  hospital$ = this.selectedHospitalSubject.asObservable();

  constructor(private http: HttpClient) {}

  getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(`${baseUrl}/hospitals`);
  }

  setHospital(hospital: Hospital): void {
    this.selectedHospitalSubject.next(hospital);
    this.saveHospitalToStorage(hospital);
  }

  getSelectedHospital(): Hospital | null {
    return this.selectedHospitalSubject.value;
  }

  private saveHospitalToStorage(hospital: Hospital): void {
    localStorage.setItem('selectedHospital', JSON.stringify(hospital));
  }

  private getHospitalFromStorage(): Hospital | null {
    const hospitalJson = localStorage.getItem('selectedHospital');
    return hospitalJson ? JSON.parse(hospitalJson) : null;
  }
}
