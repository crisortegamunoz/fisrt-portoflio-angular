import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';

import { ImportantInfoPipe } from './pipe/important-info.pipe';
import { DaysOfPublishedPipe } from './pipe/days-of-published.pipe';
import { AddCommaPipe } from './pipe/add-comma.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    WhatsappComponent,
    ImportantInfoPipe,
    DaysOfPublishedPipe,
    AddCommaPipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    WhatsappComponent,
    ImportantInfoPipe,
    DaysOfPublishedPipe,
    AddCommaPipe
  ]
})
export class SharedModule { }
