import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioComponent } from './portfolio.component';
import { PortfolioDatailComponent } from './section/portfolio-datail/portfolio-datail.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent
  },
  {
    path: ':technology',
    component: PortfolioComponent
  },
  {
    path: 'portfolioDetail/:id',
    component: PortfolioDatailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
