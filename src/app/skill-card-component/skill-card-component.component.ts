import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { StarRatingComponent } from '../star-rating-component/star-rating-component.component';

@Component({
  selector: 'app-skill-card',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ])
  ],
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
export class SkillCardComponent {
  @Input() skill: any;
  @Output() rate = new EventEmitter<any>();
  
  onRate() {
    this.rate.emit(this.skill);
  }
}