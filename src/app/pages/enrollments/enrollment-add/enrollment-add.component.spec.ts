import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentAddComponent } from './enrollment-add.component';

describe('EnrollmentAddComponent', () => {
  let component: EnrollmentAddComponent;
  let fixture: ComponentFixture<EnrollmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
