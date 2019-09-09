import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSedComponent } from './vehicle-sed.component';

describe('VehicleSedComponent', () => {
  let component: VehicleSedComponent;
  let fixture: ComponentFixture<VehicleSedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
