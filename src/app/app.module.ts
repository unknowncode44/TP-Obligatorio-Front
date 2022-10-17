import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AddProductComponent } from './products/add-product/add-product.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { reducers, metaReducers } from './reducers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AdduserComponent } from './dashboard/adduser/adduser.component';
import { SeeusersComponent } from './dashboard/seeusers/seeusers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NetworkInterceptor } from './dashboard/helpers/network.interceptor';
import { FundsComponent } from './dashboard/funds/funds.component';
import { AuthwrapperComponent } from './auth/authwrapper/authwrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    AdduserComponent,
    SeeusersComponent,
    FundsComponent,
    AuthwrapperComponent,
    
  ],
  
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
