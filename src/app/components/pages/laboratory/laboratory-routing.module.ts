import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaboratoryComponent } from './laboratory.component';
import { LaboratoryDetailComponent } from './components/laboratory-detail/laboratory-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LaboratoryComponent
  },
  {
    path: ':technology',
    component: LaboratoryComponent
  },
  {
    path: 'laboratoryDetail/:id',
    component: LaboratoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboratoryRoutingModule { }
