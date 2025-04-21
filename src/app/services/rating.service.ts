import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.model';
import { RatingDTO } from '../models/rating-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8080/api/ratings';

  constructor(private http: HttpClient) { }

  createRating(ratingDTO: RatingDTO): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, ratingDTO);
  }

  getRatingsByUser(userId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/user/${userId}`);
  }

  getRatingsBySkill(skillId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/skill/${skillId}`);
  }

  getAverageRatingForSkill(skillId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/skill/${skillId}/average`);
  }

  getTotalRatingsForSkill(skillId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/skill/${skillId}/count`);
  }
}
