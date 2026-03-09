import { Routes } from '@angular/router';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { AuthGuard } from './authGuards/auth.guard';

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        component: BlankComponent,
        pathMatch: 'full',
        title:
          'SIPROE Aleatorio | Inicio',
      },
      {
        path:'basic-tables',
        component:BasicTablesComponent,
        title:'Angular Basic Tables Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'blank',
        component:BlankComponent,
        title:'Angular Blank Dashboard | TailAdmin - Angular Admin Dashboard Template'
      }
    ]
  },
  // auth pages
  {
    path:'signin',
    component:SignInComponent,
    title:'SIPROE Aleatorio | Login'
  },
  // error pages
  {
    path:'error',
    component:NotFoundComponent,
    title:'SIPROE Aleatorio'
  },
];
