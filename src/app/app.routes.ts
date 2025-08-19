import { Routes } from '@angular/router';
import { MainFormComponent } from './components/main-form/main-form';
import { SecondaryFormComponent } from './components/secondary-form/secondary-form';

export const routes: Routes = [
  {
    path: '',
    component: MainFormComponent,
    title: 'Formulario Completo'
  },
  {
    path: 'quick-register',
    component: SecondaryFormComponent,
    title: 'Registro Rápido'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
