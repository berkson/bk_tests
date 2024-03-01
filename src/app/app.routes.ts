import { Routes } from '@angular/router';
import { HomepageComponent } from './home';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/login/components/login.routes').then(
        (mod) => mod.loginRoutes
      ),
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
];
