import { Routes } from '@angular/router';
import { HospitalSelectionComponent } from './components/hospital-selection/hospital-selection.component';
import { ModelUploadComponent } from './components/model-upload/model-upload.component';
import { ModelDownloadComponent } from './components/model-download/model-download.component';
import { HomeComponent } from './components/home/home.component';
import { VoteComponent } from './components/vote/vote.component';
import { SelectedHospitalGuard } from './guards/selected-hospital.guard';

export enum paths {
  HomePath = 'home',
  HospitalsPath = 'hospitals',
  UploadPath = 'upload',
  DownloadPath = 'download',
  VotePath = 'vote'
}

export const routes: Routes = [
  { path: '', redirectTo: '/hospitals', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SelectedHospitalGuard] },
  { path: 'hospitals', component: HospitalSelectionComponent },
  { path: 'upload', component: ModelUploadComponent, canActivate: [SelectedHospitalGuard] },
  { path: 'download', component: ModelDownloadComponent, canActivate: [SelectedHospitalGuard] },
  { path: 'vote', component: VoteComponent, canActivate: [SelectedHospitalGuard] }
];
