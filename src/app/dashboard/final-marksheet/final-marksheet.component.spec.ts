import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMarksheetComponent } from './final-marksheet.component';

describe('FinalMarksheetComponent', () => {
  let component: FinalMarksheetComponent;
  let fixture: ComponentFixture<FinalMarksheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalMarksheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
