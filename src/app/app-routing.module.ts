import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { CloudMineListComponent } from './cloudMineList/cloud-mine-list.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'mines', component: CloudMineListComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
