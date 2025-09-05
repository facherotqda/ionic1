import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ingresar',
    loadComponent: () => import('./ingresar/ingresar.page').then((m) => m.IngresarPage),
  },
  {
    path: '',
    redirectTo: 'ingresar',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
];
