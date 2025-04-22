import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingModalComponentComponent } from './rating-modal-component.component';

describe('RatingModalComponentComponent', () => {
  let component: RatingModalComponentComponent;
  let fixture: ComponentFixture<RatingModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
