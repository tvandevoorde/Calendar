import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMarkComponent } from './day-mark.component';

describe('DayMarkComponent', () => {
  let component: DayMarkComponent;
  let fixture: ComponentFixture<DayMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
