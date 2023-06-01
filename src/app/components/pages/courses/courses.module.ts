import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesItemComponent } from './components/courses-item/courses-item.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesItemComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    NgxPaginationModule
  ]
})
export class CoursesModule { }
