import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSedComponent } from './ticket-sed.component';

describe('TicketSedComponent', () => {
  let component: TicketSedComponent;
  let fixture: ComponentFixture<TicketSedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketSedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
