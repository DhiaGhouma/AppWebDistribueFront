import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = 'http://localhost:8080/api/skills';
  
  private _skills = signal<Skill[]>([]);
  private skillsSubject = new BehaviorSubject<Skill[]>([]);
  skills$ = this.skillsSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadAllSkills();
  }

  private loadAllSkills() {
    this.http.get<Skill[]>(this.apiUrl).subscribe(skills => {
      this._skills.set(skills);
      this.skillsSubject.next(skills);
    });
  }
  
  getSkills() {
    return this._skills;
  }
  
  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl).pipe(
      tap(skills => {
        this._skills.set(skills);
        this.skillsSubject.next(skills);
      })
    );
  }

  getSkillById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
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
    const currentSkills = this._skills();
    const index = currentSkills.findIndex(s => s.id === skillId);
    if (index !== -1) {
      const updatedSkills = [...currentSkills];
      updatedSkills[index] = { ...updatedSkills[index], rating: newRating };
      this._skills.set(updatedSkills);
      this.skillsSubject.next(updatedSkills);
    }
  }
}
