import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayHeaderComponent } from './day-header.component';

describe('DayHeaderComponent', () => {
  let component: DayHeaderComponent;
  let fixture: ComponentFixture<DayHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
