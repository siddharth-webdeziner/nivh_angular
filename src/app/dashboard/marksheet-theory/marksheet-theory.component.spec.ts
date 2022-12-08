import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetTheoryComponent } from './marksheet-theory.component';

describe('MarksheetTheoryComponent', () => {
  let component: MarksheetTheoryComponent;
  let fixture: ComponentFixture<MarksheetTheoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarksheetTheoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarksheetTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
