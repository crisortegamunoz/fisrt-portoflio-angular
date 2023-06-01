import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin',
        pathMatch: 'full'
      },
      {
        path: 'course',
        loadChildren: () => import('./components/certificate/certificate.module').then(m => m.CertificateModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./components/portfolio/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'lab',
        loadChildren: () => import('./components/lab/lab.module').then(m => m.LabModule)
      },
      {
        path: 'technology',
        loadChildren: () => import('./components/technology/technology.module').then(m => m.TechnologyModule)
      },
      {
        path: 'about-me',
        loadChildren: () => import('./components/about-me/about-me.module').then(m => m.AboutMeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
