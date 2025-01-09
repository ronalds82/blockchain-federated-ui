import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { contractAddress as HospitalContractAddress, abi as HospitalAbi } from '../../../backend/constants/hopsital_contract.js'
import { ethers } from '../../../backend/sample_from_tutorial/ethers-5.6.esm.min';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private selectedHospitalSubject = new BehaviorSubject<Hospital | null>(
    this.getHospitalFromStorage()
  );

  public hospital$ = this.selectedHospitalSubject.asObservable();

  // We'll store an ethers.js Contract instance
  private contract: ethers.Contract | null = null;
  private provider: ethers.providers.Web3Provider | null = null;

  constructor(private http: HttpClient) {
    // Attempt to initialize the ethers provider & contract
    // The user must have Metamask, or this will fail
    if ((window as any).ethereum) {
      this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
    } else {
      console.warn('No web3 provider found. Please install Metamask.');
    }
  }

  getHospitals(): Observable<Hospital[]> {
    if (!this.provider) {
      throw new Error('Provider is not initialized. Metamask not found?');
    }

    // Ask the user to connect, maybe remove later if somewhere else we already check this
    return from(this.provider.send('eth_requestAccounts', [])).pipe(
      switchMap(() => {
        // The user has now approved connecting their wallet.
        // Get the signer to interact with the contract
        const signer = this.provider!.getSigner();
        this.contract = new ethers.Contract(HospitalContractAddress, HospitalAbi, signer);

        // call contract
        return from(this.contract.getAllHospitals() as Promise<any[]>);
      }),
      map((hospitalDataArray: any[]) => {
        // We map what we recieve from the contract
        const hospitals: Hospital[] = hospitalDataArray.map((h: any) => {
          return {
            hospitalWalletAddress: h.hospitalAddress,
            name: h.name,
            role: Number(h.role),
            vote: Number(h.vote),
          } as Hospital;
        });
        return hospitals;
      })
    );
  }

  createHospital(hospital: Hospital): Observable<any> {
    if (!this.provider) {
      throw new Error('Provider not initialized.');
    }

    return from(this.provider.send('eth_requestAccounts', [])).pipe(
      switchMap(() => {
        const signer = this.provider!.getSigner();
        this.contract = new ethers.Contract(HospitalContractAddress, HospitalAbi, signer);

        // Use role from the model or default to 0 (Null).
        const role = hospital.role ?? 0;

        return from(this.contract.createHospital(hospital.name, role));
      })
    );
  }

  // TODO
  setHospital(hospital: Hospital): void {
    this.selectedHospitalSubject.next(hospital);
    this.saveHospitalToStorage(hospital);
  }

  // TODO 
  getSelectedHospital(): Hospital | null {
    return this.selectedHospitalSubject.value;
  }
  // TODO 
  private saveHospitalToStorage(hospital: Hospital): void {
    localStorage.setItem('selectedHospital', JSON.stringify(hospital));
  }
  // TODO 
  private getHospitalFromStorage(): Hospital | null {
    const hospitalJson = localStorage.getItem('selectedHospital');
    return hospitalJson ? JSON.parse(hospitalJson) : null;
  }
}
