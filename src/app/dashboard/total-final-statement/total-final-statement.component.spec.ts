import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalFinalStatementComponent } from './total-final-statement.component';

describe('TotalFinalStatementComponent', () => {
  let component: TotalFinalStatementComponent;
  let fixture: ComponentFixture<TotalFinalStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalFinalStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalFinalStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
