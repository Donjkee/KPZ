import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { AddEditCustomerModalComponent } from 'src/app/shared/components/modals/add-edit-customer-modal/add-edit-customer-modal.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
