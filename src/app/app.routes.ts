import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { AuthGuard } from './authGuards/auth.guard';

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'signin',
    component:SignInComponent,
    title:'Consulta Cedulas | SEP'
  },
  {
    path:'error',
    component:NotFoundComponent,
    title:'Consulta Cedulas | Not Found'
  },
];
