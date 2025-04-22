import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
export class SkillFilterComponent {
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