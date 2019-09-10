import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureSedComponent } from './departure-sed.component';

describe('DepartureSedComponent', () => {
  let component: DepartureSedComponent;
  let fixture: ComponentFixture<DepartureSedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartureSedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureSedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
