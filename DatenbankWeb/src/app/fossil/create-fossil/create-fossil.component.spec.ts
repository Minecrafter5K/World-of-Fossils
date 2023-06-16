import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFossilComponent } from './create-fossil.component';

describe('CreateComponent', () => {
  let component: CreateFossilComponent;
  let fixture: ComponentFixture<CreateFossilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFossilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFossilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
