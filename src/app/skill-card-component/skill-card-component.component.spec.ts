import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCardComponentComponent } from './skill-card-component.component';

describe('SkillCardComponentComponent', () => {
  let component: SkillCardComponentComponent;
  let fixture: ComponentFixture<SkillCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
