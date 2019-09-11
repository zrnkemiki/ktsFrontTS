import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListSEDComponent } from './price-list-sed.component';

describe('PriceListSEDComponent', () => {
  let component: PriceListSEDComponent;
  let fixture: ComponentFixture<PriceListSEDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListSEDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListSEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
