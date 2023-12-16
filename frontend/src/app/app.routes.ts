import { Routes } from '@angular/router';
import { RegisterUserComponent } from "./components/register-user/register-user.component"

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterUserComponent
  }
];
