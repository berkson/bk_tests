import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./authentication/login/components/login.routes').then(
        (mod) => mod.loginRoutes
      ),
  },
];
