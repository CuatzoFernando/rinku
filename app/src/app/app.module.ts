import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateWorkerComponent } from './components/create-worker/create-worker.component';
import { PayrollComponent } from './components/payroll/payroll.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseComponent,
    NavbarComponent,
    DetailComponent,
    CreateWorkerComponent,
    PayrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
