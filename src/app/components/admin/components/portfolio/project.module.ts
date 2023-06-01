import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';

import { MaterialModule } from '../../../../material/material.module';

import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PortfolioListComponent, 
    PortfolioFormComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class ProjectModule { }
