import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { LaboratoryComponent } from './laboratory.component';
import { LaboratoryDetailComponent } from './components/laboratory-detail/laboratory-detail.component';
import { LaboratoryItemComponent } from './components/laboratory-item/laboratory-item.component';


@NgModule({
  declarations: [
    LaboratoryComponent,
    LaboratoryDetailComponent,
    LaboratoryItemComponent
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class LaboratoryModule { }
