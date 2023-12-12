import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { CustomersRoutingModule } from './customers-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {HoverDirective} from "../../shared/directives/hover.directive";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { AddEditCustomerModalComponent } from 'src/app/shared/components/modals/add-edit-customer-modal/add-edit-customer-modal.component';
import { UpperCasePipe } from '@angular/common';

@NgModule({
  declarations: [ CustomersPageComponent, AddEditCustomerModalComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    NavbarComponent,
    HoverDirective,
    MatFormFieldModule, MatInputModule, ReactiveFormsModule, UpperCasePipe
  ],
})
export class CustomersModule { }
