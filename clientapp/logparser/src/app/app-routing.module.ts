import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LogAnalysisComponent } from './components/log-analysis/log-analysis.component';
import { LogmanagerComponent } from './components/logmanager/logmanager.component';

const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: FileUploadComponent },
  { path: 'log-analyse', component: LogAnalysisComponent },
  { path: 'log-manager', component: LogmanagerComponent },
  // You can add more routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
