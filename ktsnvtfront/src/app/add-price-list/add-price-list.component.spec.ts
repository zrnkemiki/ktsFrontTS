import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceListComponent } from './add-price-list.component';

describe('AddPriceListComponent', () => {
  let component: AddPriceListComponent;
  let fixture: ComponentFixture<AddPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
