import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../envirements/envirement';

export interface User {
  id: string; // Change from number to string for UUID support
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api`;
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  constructor() {
    // Check for existing token on service initialization
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.parseUserFromToken(token);
    }
  }
  
  parseUserFromToken(token: string): User | null {
    try {
      // Parse JWT payload (second part of token)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const user: User = {
        id: payload.sub,
        username: payload.preferred_username || payload.email,
        roles: this.extractRoles(payload)
      };
      
      this.currentUserSubject.next(user);
      return user;
    } catch (e) {
      console.error('Error parsing token:', e);
      return null;
    }
  }
  
  extractRoles(payload: any): string[] {
    // Extract roles from token based on Keycloak's format
    // This might vary depending on your Keycloak setup
    const roles = [];
    
    if (payload.realm_access && payload.realm_access.roles) {
      roles.push(...payload.realm_access.roles);
    }
    
    if (payload.resource_access) {
      Object.keys(payload.resource_access).forEach(client => {
        if (payload.resource_access[client].roles) {
          roles.push(...payload.resource_access[client].roles);
        }
      });
    }
    
    return roles;
  }
  
  getCurrentUserId(): string | null {
    return this.currentUserSubject.value?.id || null;
  }
  
  hasRole(role: string): boolean {
    return this.currentUserSubject.value?.roles.includes(role) || false;
  }
}