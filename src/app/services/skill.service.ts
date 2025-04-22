import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap, catchError } from 'rxjs';
import { Skill } from '../models/skill.model';
import { Rating } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'http://localhost:8082/api/skills';
  
  private _skills = signal<Skill[]>([]);
  private _ratings = signal<Rating[]>([
    { id: 1, userId: 1, skillId: 1, skillName: 'JavaScript', rating: 4, comment: 'Great language for frontend development!', date: '2025-01-15' },
    { id: 2, userId: 1, skillId: 2, skillName: 'Python', rating: 5, comment: 'Very versatile and easy to learn. Perfect for data science and backend work.', date: '2025-01-14' },
  ]);
  
  private skillsSubject = new BehaviorSubject<Skill[]>([]);
  skills$ = this.skillsSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadAllSkills();
  }

  private loadAllSkills() {
    this.getAllSkills().subscribe({
      next: (skills) => {
        console.log('Skills loaded successfully:', skills);
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        // Fallback to mock data if API fails
        this.loadMockSkills();
      }
    });
  }
  
  // Fallback method for development/testing
  private loadMockSkills() {
    const mockSkills: Skill[] = [
      { id: 1, name: 'JavaScript', description: 'Programming language for web development', rating: 4, icon: '🟨', category: 'Language' },
      { id: 2, name: 'Python', description: 'Versatile programming language for various applications', rating: 5, icon: '🐍', category: 'Language' },
      { id: 3, name: 'React', description: 'Frontend JavaScript library for building user interfaces', rating: 4, icon: '⚛️', category: 'Framework' },
      { id: 4, name: 'Angular', description: 'Platform for building mobile and desktop web applications', rating: 4, icon: '🅰️', category: 'Framework' },
      { id: 5, name: 'Node.js', description: 'JavaScript runtime for server-side applications', rating: 3, icon: '🟢', category: 'Runtime' },
      { id: 6, name: 'TypeScript', description: 'Strongly typed programming language that builds on JavaScript', rating: 4, icon: '🔷', category: 'Language' },
    ];
    this._skills.set(mockSkills);
    this.skillsSubject.next(mockSkills);
  }
  
  // Skill methods
  getSkills() {
    return this._skills;
  }
  
  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl).pipe(
      tap(skills => {
        this._skills.set(skills);
        this.skillsSubject.next(skills);
      }),
      catchError(error => {
        console.error('Error fetching skills:', error);
        throw error;
      })
    );
  }

  getSkillById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  getLocalSkillById(id: number): Skill | undefined {
    return this._skills().find(skill => skill.id === id);
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiUrl}/category/${category}`);
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill).pipe(
      tap(newSkill => {
        const currentSkills = this._skills();
        this._skills.set([...currentSkills, newSkill]);
        this.skillsSubject.next([...currentSkills, newSkill]);
      })
    );
  }

  updateSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, skill).pipe(
      tap(updatedSkill => {
        const currentSkills = this._skills();
        const index = currentSkills.findIndex(s => s.id === id);
        if (index !== -1) {
          const updatedSkills = [...currentSkills];
          updatedSkills[index] = updatedSkill;
          this._skills.set(updatedSkills);
          this.skillsSubject.next(updatedSkills);
        }
      })
    );
  }
  
  updateSkillRating(skillId: number, newRating: number): void {
    // Get current skill
    const currentSkills = this._skills();
    const skillToUpdate = currentSkills.find(s => s.id === skillId);
    
    if (skillToUpdate) {
      // Create a copy of the skill with the updated rating
      const updatedSkill = { ...skillToUpdate, rating: newRating };
      
      // Update via API
      this.updateSkill(skillId, updatedSkill).subscribe({
        error: (err) => console.error('Error updating skill rating:', err)
      });
    }
  }

  // Ratings methods
  getRatings() {
    return this._ratings;
  }

  getRatingsBySkillId(skillId: number): Rating[] {
    return this._ratings().filter(rating => rating.skillId === skillId);
  }

  getRatingsByUserId(userId: number): Rating[] {
    return this._ratings().filter(rating => rating.userId === userId);
  }

  addRating(userId: number, skillId: number, skillName: string, rating: number, comment: string) {
    const newRating = { 
      id: this._ratings().length + 1, 
      userId,
      skillId, 
      skillName, 
      rating, 
      comment, 
      date: new Date().toISOString().split('T')[0] 
    };
    
    this._ratings.update(ratings => [...ratings, newRating]);
    
    // Update skill average rating locally
    this._skills.update(skills => 
      skills.map(skill => 
        skill.id === skillId 
          ? { ...skill, rating: Math.round((skill.rating + rating) / 2) } 
          : skill
      )
    );
    
    // Also update on the server if connected
    const skillToUpdate = this._skills().find(s => s.id === skillId);
    if (skillToUpdate) {
      const updatedRating = Math.round((skillToUpdate.rating + rating) / 2);
      this.updateSkillRating(skillId, updatedRating);
    }
    
    return newRating;
  }

  getCategories(): string[] {
    return [...new Set(this._skills().map(skill => skill.category))];
  }
}