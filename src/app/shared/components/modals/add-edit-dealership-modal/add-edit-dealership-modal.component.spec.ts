import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDealershipModalComponent } from './add-edit-dealership.component';

describe('AddEditDealershipModalComponent', () => {
  let component: AddEditDealershipModalComponent;
  let fixture: ComponentFixture<AddEditDealershipModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditDealershipModalComponent]
    });
    fixture = TestBed.createComponent(AddEditDealershipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
