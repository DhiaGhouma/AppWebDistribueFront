import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { SkillsComponent } from '../src/app/skills-component/skills-component.component';
import { MyRatingsComponent } from '../src/app/my-ratings-component/my-ratings-component.component';
import { SkillService } from './app/services/skill.service';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../src/app/core/auth.intercepter';
// Define routes
const routes: Routes = [
  { path: '', component: SkillsComponent },
  { path: 'my-ratings', component: MyRatingsComponent },
  { path: '**', redirectTo: '/' }
];

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimations(),
    // No need to provide SkillService like this if it has @Injectable({ providedIn: 'root' })
    // { provide: SkillService, useClass: SkillService },
  ]
}).catch(err => console.error(err));