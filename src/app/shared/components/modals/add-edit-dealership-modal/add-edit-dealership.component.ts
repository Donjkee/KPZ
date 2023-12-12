import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Dealership } from 'src/app/features/models/dealership';
import {RegexConstants} from "../../../constants/regex-constants";
import {FormsChecker} from "../../../helpers/forms-checker";
import {Constants} from "../../../constants/constants";
import {Confirmable} from "../../../../core/decorators/confirmable.decorator";

@Component({
  selector: 'app-add-edit-dealership-modal',
  templateUrl: './add-edit-dealership-modal.component.html',
  styleUrls: ['./add-edit-dealership-modal.component.scss']
})

export class AddEditDealershipModalComponent implements OnInit {
  customForm: FormGroup = {} as FormGroup;
  constructor(public dialogRef: MatDialogRef<AddEditDealershipModalComponent>,
              @Inject(MAT_DIALOG_DATA) public dealership: Dealership) {
                console.log(dealership);
              }

  ngOnInit(): void {
    this.customForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.maxWordLength),
        Validators.pattern(RegexConstants.onlyLetters)]),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(Constants.maxWordLength)]),
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
    /* if(this.customForm.valid) { */
      this.dialogRef.close(this.readDataFromForm());
    /* } */
  }
 
  @Confirmable({title: 'Are you sure?!', html: 'Do you want to leave unsaved changes?', icon: 'warning'})
  onExit() {
    this.dialogRef.close(undefined);
  }

  private readDataFromForm() {
    const id: string = this.dealership.id;
    const dealershipName: string = this.customForm.controls['name'].value;
    const address : string = this.customForm.controls['address'].value;
    const phone: string = this.customForm.controls['phone'].value;
    console.log("readDataFromForm" + new Dealership(id, dealershipName, address, phone))

    return new Dealership(id, dealershipName, address, phone);
  }
}