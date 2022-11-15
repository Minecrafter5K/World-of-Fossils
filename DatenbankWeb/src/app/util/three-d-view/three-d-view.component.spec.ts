import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDViewComponent } from './three-d-view.component';

describe('ThreeDViewComponent', () => {
  let component: ThreeDViewComponent;
  let fixture: ComponentFixture<ThreeDViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeDViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeDViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
