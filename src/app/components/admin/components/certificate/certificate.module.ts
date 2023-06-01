import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CertificateRoutingModule } from './certificate-routing.module';

import { MaterialModule } from '../../../../material/material.module';

import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateFormComponent } from './certificate-form/certificate-form.component';


@NgModule({
  declarations: [
    CertificateListComponent,
    CertificateFormComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CertificateModule { }
