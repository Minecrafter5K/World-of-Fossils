import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreFossilsComponent } from './explore-fossils.component';

describe('ExploreComponent', () => {
  let component: ExploreFossilsComponent;
  let fixture: ComponentFixture<ExploreFossilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreFossilsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreFossilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
