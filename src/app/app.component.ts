import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../app/header-component/header-component.component';
import { NavbarComponent } from '../app/navbar/navbar.component';
import { animate, style, transition, trigger } from '@angular/animations';

const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 })),
  ]),
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, NavbarComponent],
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
      padding: 2rem;
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
export class AppComponent {}