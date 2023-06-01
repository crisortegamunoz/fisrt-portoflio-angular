import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../../material/material.module';
import { AboutMeRoutingModule } from './about-me-routing.module';

import { AboutMeListComponent } from './about-me-list/about-me-list.component';
import { AboutMeFormComponent } from './about-me-form/about-me-form.component';


@NgModule({
  declarations: [
    AboutMeListComponent,
    AboutMeFormComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AboutMeModule { }
