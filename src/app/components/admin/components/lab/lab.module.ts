import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../../material/material.module';
import { LabRoutingModule } from './lab-routing.module';


import { LabListComponent } from './lab-list/lab-list.component';
import { LabFormComponent } from './lab-form/lab-form.component';


@NgModule({
  declarations: [
    LabListComponent, 
    LabFormComponent],
  imports: [
    CommonModule,
    LabRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LabModule { }
