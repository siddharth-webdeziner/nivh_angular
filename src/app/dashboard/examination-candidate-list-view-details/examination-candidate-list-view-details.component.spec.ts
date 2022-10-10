import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationCandidateListViewDetailsComponent } from './examination-candidate-list-view-details.component';

describe('ExaminationCandidateListViewDetailsComponent', () => {
  let component: ExaminationCandidateListViewDetailsComponent;
  let fixture: ComponentFixture<ExaminationCandidateListViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExaminationCandidateListViewDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationCandidateListViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
