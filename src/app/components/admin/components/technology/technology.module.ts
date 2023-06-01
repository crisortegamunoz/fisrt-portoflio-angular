import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material/material.module';
import { TechnologyRoutingModule } from './technology-routing.module';

import { TechnologyListComponent } from './technology-list/technology-list.component';
import { TechnologyFormComponent } from './technology-form/technology-form.component';


@NgModule({
  declarations: [
    TechnologyListComponent,
    TechnologyFormComponent
  ],
  imports: [
    CommonModule,
    TechnologyRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TechnologyModule { }
