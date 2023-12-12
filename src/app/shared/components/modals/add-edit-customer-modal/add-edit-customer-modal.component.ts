import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Customer } from 'src/app/features/models/customer';
import {RegexConstants} from "../../../constants/regex-constants";
import {FormsChecker} from "../../../helpers/forms-checker";
import {Constants} from "../../../constants/constants";
import {Confirmable} from "../../../../core/decorators/confirmable.decorator";
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-add-edit-customer-modal',
  templateUrl: './add-edit-customer-modal.component.html',
  styleUrls: ['./add-edit-customer-modal.component.scss'],
})
export class AddEditCustomerModalComponent implements OnInit {
  customForm: FormGroup = {} as FormGroup;
  constructor(public dialogRef: MatDialogRef<AddEditCustomerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public editedCustomer: Customer) {}

  ngOnInit(): void {
    this.customForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.maxWordLength),
        Validators.pattern(RegexConstants.onlyLetters)]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.maxWordLength)]),
      email: new FormControl('', [
        Validators.maxLength(Constants.maxEmailLength),
        Validators.pattern(RegexConstants.email)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(Constants.minPhoneLength),
        Validators.maxLength(Constants.maxWordLength),
        Validators.pattern(RegexConstants.phone)]),
    });
  }

  protected readonly FormsChecker = FormsChecker;
  protected readonly Constants = Constants;

  onSubmit() {
    if(this.customForm.valid) {
      this.dialogRef.close(this.readDataFromForm());
    }
  }

  @Confirmable({title: 'Are you sure?!', html: 'Do you want to leave unsaved changes?', icon: 'warning'})
  onExit() {
    this.dialogRef.close(undefined);
  }

  private readDataFromForm() {
    const id: string = this.editedCustomer.id;
    const name: string = this.customForm.controls['name'].value;
    const address: string = this.customForm.controls['address'].value;
    const email: string = this.customForm.controls['email'].value;
    const phone: string = this.customForm.controls['phone'].value;

    return new Customer(id, name, address, email, phone);
  }
}
