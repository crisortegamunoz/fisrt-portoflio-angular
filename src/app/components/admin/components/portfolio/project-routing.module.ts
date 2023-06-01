import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';


const routes: Routes = [
  {
    path: '',
    component: PortfolioListComponent
  },
  {
    path: 'create',
    component: PortfolioFormComponent
  },
  {
    path: 'edit/:id',
    component: PortfolioFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
