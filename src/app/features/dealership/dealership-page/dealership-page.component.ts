import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Dealership} from "src/app/features/models/dealership";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { DealershipService } from '../../../core/services/dealership.service';
import { AddEditDealershipModalComponent } from 'src/app/shared/components/modals/add-edit-dealership-modal/add-edit-dealership.component';
import { CreateDealershipDto } from 'src/app/shared/dtos/create-dealership-dto';
import {Confirmable} from "../../../core/decorators/confirmable.decorator";
import {HttpErrorResponse} from "@angular/common/http";
import {CreatedEntityDto} from "../../../shared/dtos/created-entity-dto";
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-dealership-page',
  templateUrl: './dealership-page.component.html',
  styleUrls: ['./dealership-page.component.scss']
})
export class DealershipPageComponent {

  dealerships: Dealership[] = [];
  tableSource: MatTableDataSource<Dealership> = new MatTableDataSource<Dealership>();
  displayedColumns: string[] = ['Dealership ID', 'Name', 'Address', 'Phone', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = {} as MatPaginator;

  constructor(private dealershipService: DealershipService,
              public dialog: MatDialog,
              private toastrService: ToastrService) {
  }
  ngOnInit() {
    this.load();
  }

  add() {
    const dialogRef = this.dialog.open(AddEditDealershipModalComponent, {
      data: new Dealership("5069a263-b631-47a1-8064-59891a72c302", "", "", "")
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log("Created value", result);
        let createRequest: CreateDealershipDto = new CreateDealershipDto(
          result.id,
          result.name,
          result.address,
          result.phone);

        this.dealershipService.addDealership(createRequest).subscribe({
          next: (result: CreatedEntityDto) => {
            this.toastrService.success(`Dealership №${result.id} was created!`, "Success!");
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

  edit(dealershipToEdit: Dealership) {
    const dialogRef = this.dialog.open(AddEditDealershipModalComponent, {
      data: dealershipToEdit
    });

    dialogRef.afterClosed().subscribe(result => {
      dealershipToEdit = result;
      console.log("Edited value", dealershipToEdit);
      if (dealershipToEdit) {
        this.dealershipService.editDealership(dealershipToEdit).subscribe({
          next: (createdEntity: CreatedEntityDto) => {
          this.toastrService.success(`Dealership №${createdEntity.id} was edited!`, "Success!");
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

  @Confirmable({ title: 'Are you sure?!', html: 'Do you want to delete this dealership?', icon: 'warning'})
  delete(dealership: Dealership) {
      this.dealershipService.deleteDealership(dealership).subscribe(message => {
          this.toastrService.success(String(message), "Success");
          this.load();
      });
  }

  private load(): void {
    this.dealershipService.getDealerships().subscribe((result: Dealership[]) => {
      this.dealerships = result;
      console.log(result);
      this.tableSource = new MatTableDataSource<Dealership>(this.dealerships);
      this.tableSource.paginator = this.paginator;
    });
  }

}
