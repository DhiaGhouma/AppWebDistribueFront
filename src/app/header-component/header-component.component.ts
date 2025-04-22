import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
    <header class="app-header" @fadeAnimation>
      <div class="header-container">
        <div class="left-section">
          <div class="logo">
            <span class="logo-icon">⚡</span>
            <span class="logo-text">SkillRater</span>
          </div>
        </div>
        <nav class="main-nav">
          <ul>
            <li>
              <a routerLink="/" [routerLinkActive]="'active'" [routerLinkActiveOptions]="{exact: true}">
                <span class="nav-icon">🧠</span>
                <span class="nav-text">Skills</span>
              </a>
            </li>
            <li>
              <a routerLink="/my-ratings" [routerLinkActive]="'active'">
                <span class="nav-icon">⭐</span>
                <span class="nav-text">My Ratings</span>
              </a>
            </li>
            <li>
              <a routerLink="/dashboard" [routerLinkActive]="'active'">
                <span class="nav-icon">📊</span>
                <span class="nav-text">Dashboard</span>
              </a>
            </li>
            <li>
              <a routerLink="/badges" [routerLinkActive]="'active'">
                <span class="nav-icon">🏅</span>
                <span class="nav-text">Badges</span>
              </a>
            </li>
            <li>
              <a routerLink="/leaderboard" [routerLinkActive]="'active'">
                <span class="nav-icon">🏆</span>
                <span class="nav-text">Leaderboard</span>
              </a>
            </li>
            <li>
              <a routerLink="/history" [routerLinkActive]="'active'">
                <span class="nav-icon">📜</span>
                <span class="nav-text">History</span>
              </a>
            </li>
          </ul>
        </nav>
        
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
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
    }
    
    .left-section {
      justify-self: start;
      margin-right: 2rem;
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
    
    .main-nav {
      justify-self: center;
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
      justify-self: end;
    }
    
    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 1024px) {
      .header-container {
        grid-template-columns: auto 1fr auto;
      }
      
      .main-nav ul {
        gap: 1rem;
      }
    }
    
    @media (max-width: 768px) {
      .nav-text {
        display: none;
      }
      
      .main-nav ul {
        gap: 0.5rem;
      }
    }
  `]
})
export class HeaderComponent {
  isDarkMode = true;
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('light-mode');
  }
}