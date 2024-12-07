import { Routes } from '@angular/router';
import { HospitalSelectionComponent } from './components/hospital-selection/hospital-selection.component';
import { ModelUploadComponent } from './components/model-upload/model-upload.component';
import { ModelDownloadComponent } from './components/model-download/model-download.component';
import { HomeComponent } from './components/home/home.component';
import { VoteComponent } from './components/vote/vote.component';

export const routes: Routes = [
  { path: '', redirectTo: '/hospitals', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hospitals', component: HospitalSelectionComponent },
  { path: 'upload', component: ModelUploadComponent },
  { path: 'download', component: ModelDownloadComponent },
  { path: 'vote', component: VoteComponent }
];
