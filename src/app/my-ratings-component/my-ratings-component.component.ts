import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating-component/star-rating-component.component';
import { RatingService } from '../services/rating.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(20px)', opacity: 0 }),
    animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
]);

@Component({
  selector: 'app-my-ratings',
  standalone: true,
  imports: [CommonModule, StarRatingComponent, HttpClientModule, DatePipe],
  animations: [slideAnimation],
  template: `
    <div class="container" @slideAnimation>
      <div class="page-header">
        <h1>My Ratings</h1>
        <p class="subtitle">Review your skill ratings and feedback</p>
      </div>
      
      <div class="loading-container" *ngIf="ratingService.isLoading()">
        <div class="spinner"></div>
        <p>Loading your ratings...</p>
      </div>
      
      <div class="error-message" *ngIf="ratingService.error()">
        <p>{{ ratingService.error() }}</p>
        <button class="retry-button" (click)="loadUserRatings()">
          Try Again
        </button>
      </div>
      
      <div class="no-ratings" *ngIf="!ratingService.isLoading() && ratingService.userRatings().length === 0 && !ratingService.error()">
        <div class="no-ratings-icon">📝</div>
        <h3>No ratings yet</h3>
        <p>Rate some skills to see them here</p>
      </div>
      
      <div class="ratings-list" *ngIf="!ratingService.isLoading() && ratingService.userRatings().length > 0">
        <div class="rating-card" *ngFor="let rating of ratingService.userRatings()">
          <div class="rating-header">
            <div class="rating-info">
              <h3>{{ rating.skillName }}</h3>
              <app-star-rating [rating]="rating.rating"></app-star-rating>
            </div>
            <div class="rating-date">{{ rating.createdAt | date:'MMM d, yyyy' }}</div>
          </div>
          
          <div class="rating-comment">
            <p>{{ rating.comment }}</p>
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
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 0;
      margin: 2rem 0;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top-color: var(--accent-color);
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 1rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .error-message {
      background: rgba(255, 0, 0, 0.1);
      border-left: 4px solid rgba(255, 0, 0, 0.5);
      padding: 1rem;
      margin: 2rem 0;
      border-radius: 0.5rem;
    }
    
    .retry-button {
      background: var(--accent-color);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      margin-top: 0.5rem;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    
    .retry-button:hover {
      background: var(--accent-color-dark);
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
export class MyRatingsComponent implements OnInit {
  public ratingService = inject(RatingService);
  
  ngOnInit(): void {
    this.loadUserRatings();
  }
  
  loadUserRatings(): void {
    this.ratingService.getUserRatings().subscribe();
  }
}