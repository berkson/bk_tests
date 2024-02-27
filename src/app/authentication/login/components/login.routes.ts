import { Routes } from '@angular/router';
import { LoginTemplateComponent } from './login-template.component';
import { LoginComponent } from './login/login.component';

export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginTemplateComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
];
