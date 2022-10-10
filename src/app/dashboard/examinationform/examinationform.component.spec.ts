import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationformComponent } from './examinationform.component';

describe('ExaminationformComponent', () => {
  let component: ExaminationformComponent;
  let fixture: ComponentFixture<ExaminationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
