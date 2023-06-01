import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../../material/material.module';

import { SidebarComponent } from './components/sidebar/sidebar.component';

import { MAT_DATE_LOCALE } from '@angular/material/core'

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, 
      useValue: 'en-GB'
    }
  ]
})
export class AdminModule { }
