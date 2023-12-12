import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealershipPageComponent } from './dealership-page/dealership-page.component';
import { AddEditDealershipModalComponent } from 'src/app/shared/components/modals/add-edit-dealership-modal/add-edit-dealership.component';

const routes: Routes = [
  {
    path: '',
    component: DealershipPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealershipsRoutingModule { }
