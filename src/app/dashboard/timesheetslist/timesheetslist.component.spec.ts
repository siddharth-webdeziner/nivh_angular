import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetslistComponent } from './timesheetslist.component';

describe('TimesheetslistComponent', () => {
  let component: TimesheetslistComponent;
  let fixture: ComponentFixture<TimesheetslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
