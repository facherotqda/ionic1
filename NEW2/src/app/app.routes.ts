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
  {
    path: 'registrar',
    loadComponent: () => import('./registrar/registrar.page').then( m => m.RegistrarPage)
  },

];
