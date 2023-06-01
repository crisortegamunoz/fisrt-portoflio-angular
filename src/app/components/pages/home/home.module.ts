import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../../shared/shared.module';

import { HomeComponent } from './home.component';
import { AboutMeComponent } from './section/about-me/about-me.component';
import { TechnologiesComponent } from './section/technologies/technologies.component';
import { BannerComponent } from './section/banner/banner.component';
import { LaboratoryFirstComponent } from './section/laboratory-first/laboratory-first.component';
import { LaboratoryOtherComponent } from './section/laboratory-other/laboratory-other.component';
import { TechnologiesDetailComponent } from './section/technologies-detail/technologies-detail.component';
import { PortfolioPrimaryComponent } from './section/portfolio-primary/portfolio-primary.component';
import { PortfolioSecondaryComponent } from './section/portfolio-secondary/portfolio-secondary.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    PortfolioPrimaryComponent,
    PortfolioSecondaryComponent,
    AboutMeComponent,
    TechnologiesComponent,
    TechnologiesDetailComponent,
    LaboratoryFirstComponent,
    LaboratoryOtherComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
