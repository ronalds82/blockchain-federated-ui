import { Routes } from '@angular/router';
import { HospitalSelectionComponent } from './components/hospital-selection/hospital-selection.component';
import { ModelUploadComponent } from './components/model-upload/model-upload.component';
import { GlobalModelsComponent } from './components/global-models/global-models.component';

export const routes: Routes = [
  { path: '', redirectTo: '/hospitals', pathMatch: 'full' },
  { path: 'hospitals', component: HospitalSelectionComponent },
  { path: 'upload', component: ModelUploadComponent },
  { path: 'models', component: GlobalModelsComponent },
];
