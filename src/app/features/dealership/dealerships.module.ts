import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { DealershipPageComponent } from './dealership-page/dealership-page.component';
import { DealershipsRoutingModule } from './dealerships-routing.module';
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
import { AddEditDealershipModalComponent } from 'src/app/shared/components/modals/add-edit-dealership-modal/add-edit-dealership.component';
import { UpperCasePipe } from '@angular/common';

@NgModule({
  declarations: [ DealershipPageComponent, AddEditDealershipModalComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    DealershipsRoutingModule,
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
export class DealershipsModule { }
