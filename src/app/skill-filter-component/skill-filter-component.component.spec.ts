import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillFilterComponentComponent } from './skill-filter-component.component';

describe('SkillFilterComponentComponent', () => {
  let component: SkillFilterComponentComponent;
  let fixture: ComponentFixture<SkillFilterComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillFilterComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillFilterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
