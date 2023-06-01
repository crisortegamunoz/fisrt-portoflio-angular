import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeListComponent } from './about-me-list/about-me-list.component';
import { AboutMeFormComponent } from './about-me-form/about-me-form.component';


const routes: Routes = [
  {
    path: '',
    component: AboutMeListComponent
  },
  {
    path: 'create',
    component: AboutMeFormComponent
  },
  {
    path: 'edit/:id',
    component: AboutMeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMeRoutingModule { }
