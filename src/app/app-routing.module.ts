import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthGuardService as AuthGuard} from './auth/auth-guard.service';

const routes: Routes = [
  {path:"", component:LoginPageComponent},
  {path:"registration", component:RegistrationPageComponent},
  {path:"home", component:WelcomePageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
