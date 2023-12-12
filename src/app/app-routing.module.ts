import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutPageComponent } from './shared/components/about-page/about-page.component';
import { aboutGuard } from './core/guards/about.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'dealerships', loadChildren: () => import('./features/dealership/dealerships.module').then(m => m.DealershipsModule) },
  { path: 'about', component: AboutPageComponent, canActivate: [aboutGuard] },
  { path: '**', redirectTo: ''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
