import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'login', component: LoginComponent},
  {path:'canvas', component:CanvasComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegistrationComponent, LoginComponent, CanvasComponent]