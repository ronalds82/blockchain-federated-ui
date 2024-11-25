import { Routes } from '@angular/router';
import { HospitalSelectionComponent } from './components/hospital-selection/hospital-selection.component';
import { ModelUploadComponent } from './components/model-upload/model-upload.component';
import { GlobalModelsComponent } from './components/global-models/global-models.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hospitals', component: HospitalSelectionComponent },
  { path: 'upload', component: ModelUploadComponent },
  { path: 'models', component: GlobalModelsComponent },
];
