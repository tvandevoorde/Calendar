import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSummaryHeaderComponent } from './month-summary-header.component';

describe('MonthSummaryHeaderComponent', () => {
  let component: MonthSummaryHeaderComponent;
  let fixture: ComponentFixture<MonthSummaryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthSummaryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthSummaryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
