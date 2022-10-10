import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitcardComponent } from './admitcard.component';

describe('AdmitcardComponent', () => {
  let component: AdmitcardComponent;
  let fixture: ComponentFixture<AdmitcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmitcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmitcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
