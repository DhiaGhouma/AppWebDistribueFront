import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../envirements/envirement'; // Fixed typo
import { AuthService } from './authetication.service'; // Add this import

export interface Rating {
  id: number;
  userId: number;
  skillId: number;
  skillName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private http = inject(HttpClient);
  private authService = inject(AuthService); // Added this injection
  private apiUrl = `${environment.apiUrl}/api/ratings`;
  
  private _userRatings = signal<Rating[]>([]);
  userRatings = this._userRatings.asReadonly();
  
  private _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();
  
  private _error = signal<string | null>(null);
  error = this._error.asReadonly();

  /**
   * Fetch ratings for the currently authenticated user
   */
  getUserRatings(): Observable<Rating[]> {
    this._isLoading.set(true);
    this._error.set(null);
    
    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
      this._error.set('You must be logged in to view your ratings');
      this._isLoading.set(false);
      return of([]);
    }
    
    return this.http.get<Rating[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap(ratings => {
        this._userRatings.set(ratings);
        this._isLoading.set(false);
      }),
      catchError(error => {
        console.error('Error fetching user ratings:', error);
        this._error.set('Failed to load your ratings. Please try again.');
        this._isLoading.set(false);
        return of([]);
      })
    );
  }
}