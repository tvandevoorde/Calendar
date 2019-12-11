import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSummaryContentComponent } from './month-summary-content.component';

describe('MonthSummaryContentComponent', () => {
  let component: MonthSummaryContentComponent;
  let fixture: ComponentFixture<MonthSummaryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthSummaryContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthSummaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
