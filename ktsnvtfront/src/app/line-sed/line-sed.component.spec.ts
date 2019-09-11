import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSedComponent } from './line-sed.component';

describe('LineSedComponent', () => {
  let component: LineSedComponent;
  let fixture: ComponentFixture<LineSedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineSedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineSedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
