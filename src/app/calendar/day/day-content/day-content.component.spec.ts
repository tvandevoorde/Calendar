import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayContentComponent } from './day-content.component';

describe('DayContentComponent', () => {
  let component: DayContentComponent;
  let fixture: ComponentFixture<DayContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
