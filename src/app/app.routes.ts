import { Routes } from '@angular/router';
import { LoginComponent, SignupComponent } from './auth';

export const routes: Routes = [
  { path: '', title: 'Login', component: SignupComponent },
  { path: 'login', title: 'Login', component: LoginComponent }
];
