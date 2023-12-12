import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "src/app/features/models/customer";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { CustomerService } from '../../../core/services/customer.service';
import { AddEditCustomerModalComponent } from 'src/app/shared/components/modals/add-edit-customer-modal/add-edit-customer-modal.component';
import { CreateCustomerDto } from 'src/app/shared/dtos/create-customer-dto';
import {Confirmable} from "../../../core/decorators/confirmable.decorator";
import {HttpErrorResponse} from "@angular/common/http";
import {CreatedEntityDto} from "../../../shared/dtos/created-entity-dto";
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss']
})
export class CustomersPageComponent {

  customers: Customer[] = [];
  tableSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['Customer ID', 'Name', 'Address','Email', 'Phone', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = {} as MatPaginator;

  constructor(private customerService: CustomerService,
              public dialog: MatDialog,
              private toastrService: ToastrService) {
  }
  ngOnInit() {
    this.load();
  }

  add() {
    const dialogRef = this.dialog.open(AddEditCustomerModalComponent, {
      data: new Customer("5069a263-b631-47a1-8064-59891a72c302", "", "", "", "")
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log("Created value", result);
        let createRequest: CreateCustomerDto = new CreateCustomerDto(
          result.id,
          result.name,
          result.address,
          result.phone,
          result.email);

        this.customerService.addCustomer(createRequest).subscribe({
          next: (result: CreatedEntityDto) => {
            this.toastrService.success(`Customer №${result.id} was created!`, "Success!");
            window.location.reload();
          },
          error: (httpError: HttpErrorResponse) => {
            const errorValue: any | null = httpError.error;
            const errorCode: number = httpError.status;
            console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`);
          }
        });
      } else {
        this.toastrService.warning("Request body is empty", "Attention!");
      }
    });
  }

  edit(customerToEdit: Customer) {
    const dialogRef = this.dialog.open(AddEditCustomerModalComponent, {
      data: customerToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      customerToEdit = result;
      console.log("Edited value", customerToEdit);
      if (customerToEdit) {
        this.customerService.editCustomer(customerToEdit).subscribe({
          next: (createdEntity: CreatedEntityDto) => {
          this.toastrService.success(`Customer №${createdEntity.id} was edited!`, "Success!");
          window.location.reload();
        },
          error: (httpError: HttpErrorResponse) => {
            const errorValue: any | null = httpError.error;
            const errorCode: number = httpError.status;
            console.error(`Endpoint returned error ${errorValue} with status code ${errorCode}`);
          }
        });
      }
      else {
        this.toastrService.warning("Request body is empty", "Attention!");
      }
    });
  }

  @Confirmable({ title: 'Are you sure?!', html: 'Do you want to delete this customer?', icon: 'warning'})
  delete(customer: Customer) {
      this.customerService.deleteCustomer(customer).subscribe(message => {
          this.toastrService.success(String(message), "Success");
          this.load();
      });
  }

  private load(): void {
    this.customerService.getCustomers().subscribe((result: Customer[]) => {
      this.customers = result;
      this.tableSource = new MatTableDataSource<Customer>(this.customers);
      this.tableSource.paginator = this.paginator;
    });
  }

}
