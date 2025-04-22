import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { StarRatingComponent } from '../star-rating-component/star-rating-component.component';

@Component({
  selector: 'app-rating-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ])
  ],
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
export class RatingModalComponent {
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