import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthwrapperComponent } from './auth/authwrapper/authwrapper.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdduserComponent } from './dashboard/adduser/adduser.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { FundsComponent } from './dashboard/funds/funds.component';
import { SeeusersComponent } from './dashboard/seeusers/seeusers.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component : AuthwrapperComponent },
  { path: 'dashboard', component : DashboardComponent, children: dashboardRoutes},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
