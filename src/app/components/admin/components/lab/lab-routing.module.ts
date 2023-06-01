import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabListComponent } from './lab-list/lab-list.component';
import { LabFormComponent } from './lab-form/lab-form.component';


const routes: Routes = [
  {
    path: '',
    component: LabListComponent
  },
  {
    path: 'create',
    component: LabFormComponent
  },
  {
    path: 'edit/:id',
    component: LabFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
