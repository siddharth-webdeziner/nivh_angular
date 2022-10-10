import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexaminationcenterComponent } from './addexaminationcenter.component';

describe('AddexaminationcenterComponent', () => {
  let component: AddexaminationcenterComponent;
  let fixture: ComponentFixture<AddexaminationcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddexaminationcenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddexaminationcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
