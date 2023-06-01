import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';

import { AdminGuard } from './core/guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'portfolio',
        loadChildren: () => import('./components/pages/portfolio/portfolio.module').then(m => m.PortfolioModule)
      },
      {
        path: 'laboratory',
        loadChildren: () => import('./components/pages/laboratory/laboratory.module').then(m => m.LaboratoryModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./components/pages/courses/courses.module').then(m => m.CoursesModule)
      }/*,
      {
        path: 'version',
        loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule)
      }*/
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    loadChildren: () => import('./components/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
