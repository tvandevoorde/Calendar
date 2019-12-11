import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedFieldComponent } from './calculated-field.component';

describe('CalculatedFieldComponent', () => {
  let component: CalculatedFieldComponent;
  let fixture: ComponentFixture<CalculatedFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatedFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
