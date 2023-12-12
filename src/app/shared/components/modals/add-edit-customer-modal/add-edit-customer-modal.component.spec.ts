import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomerModalComponent } from './add-edit-customer-modal.component';

describe('AddEditCustomerModalComponent', () => {
  let component: AddEditCustomerModalComponent;
  let fixture: ComponentFixture<AddEditCustomerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditCustomerModalComponent]
    });
    fixture = TestBed.createComponent(AddEditCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
