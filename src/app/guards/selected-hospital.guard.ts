import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SelectedHospitalGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const selectedHospital = localStorage.getItem('selectedHospital');
    if (!selectedHospital) {
      this.router.navigate(['/hospitals']);
      return false;
    }
    return true;
  }
}
