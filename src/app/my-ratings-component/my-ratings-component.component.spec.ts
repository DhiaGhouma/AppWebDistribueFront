import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRatingsComponent } from './my-ratings-component.component';

describe('MyRatingsComponentComponent', () => {
  let component: MyRatingsComponent;
  let fixture: ComponentFixture<MyRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRatingsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
