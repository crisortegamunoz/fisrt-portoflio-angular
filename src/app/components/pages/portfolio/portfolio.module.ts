import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { PortfolioRoutingModule } from './portfolio-routing.module';

import { PortfolioComponent } from './portfolio.component';
import { PortfolioDatailComponent } from './section/portfolio-datail/portfolio-datail.component';
import { PortfolioItemsComponent } from './components/portfolio-items/portfolio-items.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioDatailComponent,
    PortfolioItemsComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class PortfolioModule { }
