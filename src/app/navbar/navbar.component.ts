import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active-link" class="nav-link">
            <div class="icon-container">
              <mat-icon>dashboard</mat-icon>
            </div>
            <span class="nav-text">Dashboard</span>
          </a>
          <a routerLink="/badges" routerLinkActive="active-link" class="nav-link">
            <div class="icon-container">
              <mat-icon>military_tech</mat-icon>
            </div>
            <span class="nav-text">Badges</span>
          </a>
          <a routerLink="/leaderboard" routerLinkActive="active-link" class="nav-link">
            <div class="icon-container">
              <mat-icon>leaderboard</mat-icon>
            </div>
            <span class="nav-text">Leaderboard</span>
          </a>
          <a routerLink="/history" routerLinkActive="active-link" class="nav-link">
            <div class="icon-container">
              <mat-icon>history</mat-icon>
            </div>
            <span class="nav-text">History</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: var(--bg-secondary);
      border-radius: 12px;
      margin: 0 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 1rem;
      z-index: 100;
    }
    
    .nav-container {
      padding: 0.5rem;
    }
    
    .nav-links {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    
    .nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: var(--text-secondary);
      padding: 0.75rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.3s ease;
      flex: 1;
    }
    
    .nav-link:hover {
      color: var(--text-color);
      background-color: rgba(255, 255, 255, 0.05);
      transform: translateY(-2px);
    }
    
    .icon-container {
      display: flex;
      justify-content: center;
      margin-bottom: 4px;
    }
    
    .icon-container mat-icon {
      font-size: 24px;
      height: 24px;
      width: 24px;
    }
    
    .nav-text {
      font-size: 0.85rem;
      font-weight: 500;
    }
    
    .active-link {
      color: var(--text-color);
      background: linear-gradient(135deg, rgba(0, 114, 255, 0.15), rgba(0, 198, 255, 0.15));
      position: relative;
      overflow: hidden;
    }
    
    .active-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 25%;
      width: 50%;
      height: 3px;
      background: linear-gradient(90deg, rgba(0, 114, 255, 0.7), rgba(0, 198, 255, 0.7));
      border-radius: 3px 3px 0 0;
    }
    
    @media (max-width: 768px) {
      .navbar {
        margin: 0 1rem;
      }
      
      .nav-text {
        font-size: 0.75rem;
      }
      
      .nav-link {
        padding: 0.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .nav-text {
        display: none;
      }
      
      .nav-link {
        padding: 0.5rem 0.25rem;
      }
    }
  `]
})
export class NavbarComponent {}