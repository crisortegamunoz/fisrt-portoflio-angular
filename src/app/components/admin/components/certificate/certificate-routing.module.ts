import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateFormComponent } from './certificate-form/certificate-form.component';


const routes: Routes = [
  {
    path: '',
    component: CertificateListComponent
  },
  {
    path: 'create',
    component: CertificateFormComponent
  },
  {
    path: 'edit/:id',
    component: CertificateFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule { }
