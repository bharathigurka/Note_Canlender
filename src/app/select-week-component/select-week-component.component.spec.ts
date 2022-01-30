import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWeekComponentComponent } from './select-week-component.component';

describe('SelectWeekComponentComponent', () => {
  let component: SelectWeekComponentComponent;
  let fixture: ComponentFixture<SelectWeekComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectWeekComponentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWeekComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
