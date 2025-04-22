import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class StarRatingComponent {
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