import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnologyListComponent } from './technology-list/technology-list.component';
import { TechnologyFormComponent } from './technology-form/technology-form.component';


const routes: Routes = [
  {
    path: '',
    component: TechnologyListComponent
  },
  {
    path: 'create',
    component: TechnologyFormComponent
  },
  {
    path: 'edit/:id',
    component: TechnologyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnologyRoutingModule { }
