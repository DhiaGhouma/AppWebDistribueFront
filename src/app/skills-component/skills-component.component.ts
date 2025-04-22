import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModalComponent } from '../rating-modal-component/rating-modal-component.component';
import { SkillFilterComponent } from '../skill-filter-component/skill-filter-component.component';
import { SkillCardComponent } from '../skill-card-component/skill-card-component.component';
import { SkillService } from '../services/skill.service';
import { animate, style, transition, trigger } from '@angular/animations';

const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(20px)', opacity: 0 }),
    animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
]);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule, 
    RatingModalComponent, 
    SkillFilterComponent,
    SkillCardComponent
  ],
  animations: [slideAnimation],
  template: `
    <div class="container" @slideAnimation>
      <div class="page-header">
        <h1>Available Skills</h1>
        <p class="subtitle">Browse and rate professional skills</p>
      </div>
      
      <app-skill-filter 
        [categories]="categories"
        (filtersChanged)="applyFilters($event)"
      ></app-skill-filter>
      
      <div class="no-results" *ngIf="filteredSkills().length === 0">
        <div class="no-results-icon">🔍</div>
        <h3>No skills found</h3>
        <p>Try adjusting your filters or search term</p>
      </div>
      
      <div class="skills-grid">
        <app-skill-card 
          *ngFor="let skill of filteredSkills()"
          [skill]="skill"
          (rate)="openRatingModal($event)"
        ></app-skill-card>
      </div>
    </div>

    <app-rating-modal
      [visible]="isModalVisible"
      [skill]="selectedSkill"
      (close)="isModalVisible = false"
      (submit)="onRatingSubmit($event)"
    ></app-rating-modal>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: auto;
      padding: 2rem;
    }
    
    .page-header {
      margin-bottom: 2rem;
    }
    
    .page-header h1 {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }
    
    .subtitle {
      color: var(--text-secondary);
    }
    
    .skills-grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    
    .no-results {
      text-align: center;
      padding: 3rem 0;
      margin: 2rem 0;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 1rem;
      border: 1px dashed rgba(255, 255, 255, 0.1);
    }
    
    .no-results-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.4;
    }
    
    .no-results h3 {
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }
    
    .no-results p {
      color: var(--text-secondary);
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
      
      .skills-grid {
        gap: 1rem;
      }
    }
  `]
})
export class SkillsComponent {
  private skillService = inject(SkillService);
  
  isModalVisible = false;
  selectedSkill: any = null;
  filters = {
    search: '',
    category: 'All',
    sort: 'nameAsc'
  };
  
  skills = this.skillService.getSkills();
  filteredSkills = signal(this.skills());
  
  get categories(): string[] {
    const categories = ['All', ...new Set(this.skills().map(skill => skill.category))];
    return categories;
  }
  
  openRatingModal(skill: any) {
    this.selectedSkill = skill;
    this.isModalVisible = true;
  }
  
  onRatingSubmit(ratingData: any) {
    this.skillService.addRating(
      ratingData.userId,
      ratingData.skillId,
      ratingData.skillName,
      ratingData.rating,
      ratingData.comment
    );
    this.isModalVisible = false;
  }
  
  applyFilters(filterData: any) {
    this.filters = filterData;
    
    this.filteredSkills.set(this.skills().filter(skill => {
      // Apply search filter
      const matchesSearch = skill.name.toLowerCase().includes(filterData.search.toLowerCase()) ||
                            skill.description.toLowerCase().includes(filterData.search.toLowerCase());
      
      // Apply category filter
      const matchesCategory = filterData.category === 'All' || skill.category === filterData.category;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      // Apply sorting
      switch(filterData.sort) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'ratingDesc':
          return b.rating - a.rating;
        case 'ratingAsc':
          return a.rating - b.rating;
        default:
          return 0;
      }
    }));
  }
}