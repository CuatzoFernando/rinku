import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BaseComponent } from './components/base/base.component';
import { DetailComponent } from './components/detail/detail.component';
import { CreateWorkerComponent } from './components/create-worker/create-worker.component';
import { PayrollComponent } from './components/payroll/payroll.component';

const routes: Routes = [
  { path: '', redirectTo: '*', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateWorkerComponent },
  { path: 'payroll/:id', component: PayrollComponent },
  { path: 'detalle/:id', component: DetailComponent },
  { path: '*', component: BaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
