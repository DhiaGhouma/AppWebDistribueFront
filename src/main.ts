



import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RatingService } from '../src/app/services/rating.service';
import { UserService } from '../src/app/services/user.service';
import { Skill } from '../src/app/models/skill.model';
import { Rating } from '../src/app/models/rating.model';

// Animation definitions
const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 })),
  ]),
]);

const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(20px)', opacity: 0 }),
    animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
]);

// Services
class SkillService {
  private _skills = signal([
    { id: 1, name: 'JavaScript', description: 'Programming language for web development', rating: 4, icon: '🟨', category: 'Language' },
    { id: 2, name: 'Python', description: 'Versatile programming language for various applications', rating: 5, icon: '🐍', category: 'Language' },
    { id: 3, name: 'React', description: 'Frontend JavaScript library for building user interfaces', rating: 4, icon: '⚛️', category: 'Framework' },
    { id: 4, name: 'Angular', description: 'Platform for building mobile and desktop web applications', rating: 4, icon: '🅰️', category: 'Framework' },
    { id: 5, name: 'Node.js', description: 'JavaScript runtime for server-side applications', rating: 3, icon: '🟢', category: 'Runtime' },
    { id: 6, name: 'TypeScript', description: 'Strongly typed programming language that builds on JavaScript', rating: 4, icon: '🔷', category: 'Language' },
  ]);

  private _ratings = signal([
    { id: 1, skillId: 1, skillName: 'JavaScript', rating: 4, comment: 'Great language for frontend development!', date: '2025-01-15' },
    { id: 2, skillId: 2, skillName: 'Python', rating: 5, comment: 'Very versatile and easy to learn. Perfect for data science and backend work.', date: '2025-01-14' },
  ]);

  getSkills() {
    return this._skills;
  }

  getRatings() {
    return this._ratings;
  }

  addRating(skillId: number, skillName: string, rating: number, comment: string) {
    const newRating = {
      id: this._ratings().length + 1,
      skillId,
      skillName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    this._ratings.update(ratings => [...ratings, newRating]);
    
    // Update skill average rating
    this._skills.update(skills => 
      skills.map(skill => 
        skill.id === skillId ? { ...skill, rating: Math.round((skill.rating + rating) / 2) } : skill
      )
    );
    
    return newRating;
  }
}

// Header Component
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  animations: [fadeAnimation],
  template: `
    <header class="app-header" @fadeAnimation>
      <div class="header-container">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">SkillRater</span>
        </div>
        <nav class="main-nav">
          <ul>
            <li>
              <a routerLink="/" [routerLinkActive]="'active'" [routerLinkActiveOptions]="{exact: true}">
                <span class="nav-icon">🏠</span>
                <span class="nav-text">Skills</span>
              </a>
            </li>
            <li>
              <a routerLink="/my-ratings" [routerLinkActive]="'active'">
                <span class="nav-icon">📊</span>
                <span class="nav-text">My Ratings</span>
              </a>
            </li>
          </ul>
        </nav>
        <button class="theme-toggle" (click)="toggleTheme()">
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      padding: 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
    }
    
    .logo-icon {
      font-size: 1.5rem;
    }
    
    .logo-text {
      font-size: 1.5rem;
      background: linear-gradient(90deg, #00c6ff, #0072ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .main-nav ul {
      display: flex;
      list-style: none;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }
    
    .main-nav a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .main-nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .main-nav a.active {
      background: rgba(0, 198, 255, 0.15);
      color: #00c6ff;
    }
    
    .nav-icon {
      font-size: 1.25rem;
    }
    
    .theme-toggle {
      background: transparent;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text-color);
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 768px) {
      .nav-text {
        display: none;
      }
      
      .main-nav ul {
        gap: 1rem;
      }
    }
  `]
})
class HeaderComponent {
  isDarkMode = true;
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('light-mode');
  }
}

// Star Rating Component
@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating" [class.interactive]="interactive">
      <span 
        *ngFor="let star of [1,2,3,4,5]" 
        class="star"
        [class.filled]="star <= rating"
        [class.hovered]="interactive && star <= hoverRating"
        (mouseenter)="setHoverRating(star)"
        (mouseleave)="clearHoverRating()"
        (click)="interactive && setRating(star)"
      >
        {{star <= (hoverRating || rating) ? '★' : '☆'}}
      </span>
      <span *ngIf="showValue" class="rating-value">{{rating}}/5</span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
    
    .star {
      font-size: 1.5rem;
      color: #aaa;
      transition: all 0.2s ease;
    }
    
    .star.filled {
      color: #ffc107;
    }
    
    .interactive .star {
      cursor: pointer;
    }
    
    .interactive .star.hovered {
      color: #ffda6b;
      transform: scale(1.2);
    }
    
    .rating-value {
      margin-left: 0.5rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
  `]
})
class StarRatingComponent {
  @Input() rating = 0;
  @Input() interactive = false;
  @Input() showValue = false;
  @Output() ratingChange = new EventEmitter<number>();
  
  hoverRating = 0;
  
  setHoverRating(rating: number) {
    if (this.interactive) {
      this.hoverRating = rating;
    }
  }
  
  clearHoverRating() {
    this.hoverRating = 0;
  }
  
  setRating(rating: number) {
    this.rating = rating;
    this.ratingChange.emit(rating);
  }
}

// Rating Modal Component
@Component({
  selector: 'app-rating-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent],
  animations: [fadeAnimation, slideAnimation],
  template: `
    <div class="modal-overlay" *ngIf="visible" @fadeAnimation (click)="onClickOutside($event)">
      <div class="modal" @slideAnimation>
        <div class="modal-header">
          <div class="skill-info">
            <span class="skill-icon">{{skill?.icon || '💡'}}</span>
            <h2>Rate {{skill?.name}}</h2>
          </div>
          <button class="close-btn" (click)="onClose()">×</button>
        </div>
        
        <div class="modal-body">
          <div class="rating-container">
            <label>Your Rating</label>
            <app-star-rating 
              [rating]="rating" 
              [interactive]="true"
              (ratingChange)="rating = $event"
            ></app-star-rating>
          </div>
          
          <div class="comment-container">
            <label for="comment">Your Feedback</label>
            <textarea
              id="comment"
              [(ngModel)]="comment"
              placeholder="Share your experience with this skill..."
              rows="4"
            ></textarea>
            <div class="char-count" [class.warning]="comment.length > 200">
              {{comment.length}}/300
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary" (click)="onClose()">Cancel</button>
          <button 
            class="btn btn-primary" 
            [disabled]="rating === 0" 
            (click)="onSubmit()"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      backdrop-filter: blur(8px);
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    
    .modal {
      background: rgba(30, 41, 59, 0.8);
      color: #f1f1f1;
      padding: 0;
      border-radius: 1rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.2);
    }
    
    .skill-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .skill-icon {
      font-size: 1.75rem;
    }
    
    .modal-header h2 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 500;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      font-size: 1.8rem;
      color: #f1f1f1;
      cursor: pointer;
      line-height: 1;
      opacity: 0.7;
      transition: all 0.2s ease;
    }
    
    .close-btn:hover {
      opacity: 1;
      transform: scale(1.1);
    }
    
    .modal-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .rating-container, .comment-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    label {
      font-size: 0.9rem;
      opacity: 0.8;
      font-weight: 500;
    }
    
    textarea {
      width: 100%;
      padding: 1rem;
      border-radius: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.2);
      color: #f1f1f1;
      font-size: 1rem;
      resize: vertical;
      font-family: inherit;
      transition: all 0.3s ease;
    }
    
    textarea:focus {
      outline: none;
      border-color: rgba(0, 198, 255, 0.5);
      box-shadow: 0 0 0 2px rgba(0, 198, 255, 0.25);
    }
    
    .char-count {
      align-self: flex-end;
      font-size: 0.8rem;
      opacity: 0.6;
    }
    
    .char-count.warning {
      color: #ffc107;
    }
    
    .modal-footer {
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      border: none;
      font-weight: 500;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }
    
    .btn:active:not(:disabled) {
      transform: translateY(0);
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .btn-primary {
      background: linear-gradient(90deg, #00c6ff, #0072ff);
      color: white;
    }
    
    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `]
})
class RatingModalComponent {
  @Input() visible = false;
  @Input() skill: any;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  rating = 0;
  comment = '';

  onClose() {
    this.reset();
    this.close.emit();
  }

  onSubmit() {
    if (this.rating > 0) {
      this.submit.emit({
        skillId: this.skill.id,
        skillName: this.skill.name,
        rating: this.rating,
        comment: this.comment
      });
      this.reset();
    }
  }
  
  onClickOutside(event: MouseEvent) {
    if ((event.target as HTMLElement).className === 'modal-overlay') {
      this.onClose();
    }
  }
  
  private reset() {
    this.rating = 0;
    this.comment = '';
  }
}

// Filter Component - Simplified
@Component({
  selector: 'app-skill-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-container">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          [(ngModel)]="searchTerm"
          (input)="onFilterChange()"
          placeholder="Search skills..." 
        />
        <button 
          *ngIf="searchTerm" 
          class="clear-btn" 
          (click)="clearSearch()"
        >
          ×
        </button>
      </div>
      
      <div class="category-filters">
        <button 
          *ngFor="let category of categories" 
          class="category-btn" 
          [class.active]="selectedCategory === category"
          (click)="selectCategory(category)"
        >
          {{category}}
        </button>
      </div>
      
      <div class="sort-dropdown">
        <select [(ngModel)]="sortOption" (change)="onFilterChange()">
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="ratingDesc">Rating (High-Low)</option>
          <option value="ratingAsc">Rating (Low-High)</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    .filter-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .search-box {
      flex: 1;
      position: relative;
      min-width: 200px;
    }
    
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.7;
    }
    
    .search-box input {
      width: 100%;
      padding: 0.75rem 2.5rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.2);
      color: var(--text-color);
      font-size: 1rem;
    }
    
    .search-box input:focus {
      outline: none;
      border-color: rgba(0, 198, 255, 0.5);
      box-shadow: 0 0 0 2px rgba(0, 198, 255, 0.25);
    }
    
    .clear-btn {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: var(--text-color);
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0.7;
    }
    
    .clear-btn:hover {
      opacity: 1;
    }
    
    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .category-btn {
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.2);
      color: var(--text-color);
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .category-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .category-btn.active {
      background: rgba(0, 198, 255, 0.2);
      border-color: rgba(0, 198, 255, 0.5);
      color: #00c6ff;
    }
    
    .sort-dropdown {
      min-width: 150px;
    }
    
    .sort-dropdown select {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.2);
      color: var(--text-color);
      font-size: 0.9rem;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1em;
    }
    
    @media (max-width: 768px) {
      .search-box, .sort-dropdown {
        width: 100%;
      }
      
      .filter-container {
        gap: 1.5rem;
      }
    }
  `]
})
class SkillFilterComponent {
  @Input() categories: string[] = [];
  @Output() filtersChanged = new EventEmitter<any>();
  
  searchTerm = '';
  selectedCategory = 'All';
  sortOption = 'nameAsc';
  
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.onFilterChange();
  }
  
  clearSearch() {
    this.searchTerm = '';
    this.onFilterChange();
  }
  
  onFilterChange() {
    this.filtersChanged.emit({
      search: this.searchTerm,
      category: this.selectedCategory,
      sort: this.sortOption
    });
  }
}

// Skill Card Component
@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  animations: [fadeAnimation],
  template: `
    <div class="skill-card" @fadeAnimation>
      <div class="skill-header">
        <span class="skill-icon">{{skill.icon}}</span>
        <span class="skill-category">{{skill.category}}</span>
      </div>
      
      <h3 class="skill-name">{{skill.name}}</h3>
      <p class="skill-description">{{skill.description}}</p>
      
      <div class="skill-footer">
        <app-star-rating [rating]="skill.rating" [showValue]="true"></app-star-rating>
        <button class="rate-btn" (click)="onRate()">Rate</button>
      </div>
    </div>
  `,
  styles: [`
    .skill-card {
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(14px);
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.05);
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .skill-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
      border-color: rgba(0, 198, 255, 0.2);
    }
    
    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .skill-icon {
      font-size: 2rem;
    }
    
    .skill-category {
      font-size: 0.8rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.3rem 0.8rem;
      border-radius: 1rem;
    }
    
    .skill-name {
      font-size: 1.3rem;
      margin-bottom: 0.75rem;
      color: var(--text-color);
    }
    
    .skill-description {
      font-size: 0.95rem;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    
    .skill-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .rate-btn {
      background: linear-gradient(90deg, #00c6ff, #0072ff);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .rate-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 114, 255, 0.3);
    }
  `]
})
class SkillCardComponent {
  @Input() skill: any;
  @Output() rate = new EventEmitter<any>();
  
  onRate() {
    this.rate.emit(this.skill);
  }
}

// Skills Component
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
class SkillsComponent {
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

// My Ratings Component
@Component({
  selector: 'app-my-ratings',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  animations: [slideAnimation],
  template: `
    <div class="container" @slideAnimation>
      <div class="page-header">
        <h1>My Ratings</h1>
        <p class="subtitle">Review your skill ratings and feedback</p>
      </div>
      
      <div class="no-ratings" *ngIf="ratings().length === 0">
        <div class="no-ratings-icon">📝</div>
        <h3>No ratings yet</h3>
        <p>Rate some skills to see them here</p>
      </div>
      
      <div class="ratings-list">
        <div class="rating-card" *ngFor="let rating of ratings()">
          <div class="rating-header">
            <div class="rating-info">
              <h3>{{rating.skillName}}</h3>
              <app-star-rating [rating]="rating.rating"></app-star-rating>
            </div>
            <div class="rating-date">{{rating.date}}</div>
          </div>
          
          <div class="rating-comment">
            <p>{{rating.comment}}</p>
          </div>
        </div>
      </div>
    </div>
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
    
    .no-ratings {
      text-align: center;
      padding: 3rem 0;
      margin: 2rem 0;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 1rem;
      border: 1px dashed rgba(255, 255, 255, 0.1);
    }
    
    .no-ratings-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.4;
    }
    
    .no-ratings h3 {
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }
    
    .no-ratings p {
      color: var(--text-secondary);
    }
    
    .ratings-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .rating-card {
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(14px);
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .rating-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }
    
    .rating-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .rating-info h3 {
      margin-bottom: 0.5rem;
      color: var(--text-color);
    }
    
    .rating-date {
      font-size: 0.9rem;
      opacity: 0.7;
    }
    
    .rating-comment {
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .rating-comment p {
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.7;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
    }
  `]
})
class MyRatingsComponent {
  private skillService = inject(SkillService);
  ratings = this.skillService.getRatings();
}

// Main App Component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  animations: [fadeAnimation],
  template: `
    <div class="app-wrapper">
      <app-header></app-header>
      <main class="main-content" @fadeAnimation>
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        <div class="footer-content">
          <p>© 2025 SkillRater · Built with Angular</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    
    .app-wrapper {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
    }
    
    .footer {
      background: rgba(255, 255, 255, 0.03);
      padding: 1.5rem 0;
      margin-top: 3rem;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      text-align: center;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }
    
    :root {
      --text-color: rgba(255, 255, 255, 0.95);
      --text-secondary: rgba(255, 255, 255, 0.7);
      --bg-color: #121212;
      --bg-secondary: #1e1e1e;
    }
    
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      transition: background-color 0.3s ease, color 0.3s ease;
      background-image: 
        radial-gradient(circle at 15% 50%, rgba(0, 198, 255, 0.15) 0%, transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(0, 114, 255, 0.1) 0%, transparent 20%);
      background-attachment: fixed;
    }
    
    body.light-mode {
      --text-color: #1a1a1a;
      --text-secondary: #4a4a4a;
      --bg-color: #f9f9f9;
      --bg-secondary: #efefef;
    }
  `]
})
class AppComponent {}

// Define routes
const routes: Routes = [
  { path: '', component: SkillsComponent },
  { path: 'my-ratings', component: MyRatingsComponent },
  { path: '**', redirectTo: '/' }
];

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: SkillService, useClass: SkillService }
  ]
}).catch(err => console.error(err));