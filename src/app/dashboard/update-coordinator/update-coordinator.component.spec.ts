import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoordinatorComponent } from './update-coordinator.component';

describe('UpdateCoordinatorComponent', () => {
  let component: UpdateCoordinatorComponent;
  let fixture: ComponentFixture<UpdateCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCoordinatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
