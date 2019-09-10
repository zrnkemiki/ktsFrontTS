import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSedComponent } from './stop-sed.component';

describe('StopSedComponent', () => {
  let component: StopSedComponent;
  let fixture: ComponentFixture<StopSedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopSedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopSedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
