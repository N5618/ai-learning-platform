import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningForm } from './learning-form';

describe('LearningForm', () => {
  let component: LearningForm;
  let fixture: ComponentFixture<LearningForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
