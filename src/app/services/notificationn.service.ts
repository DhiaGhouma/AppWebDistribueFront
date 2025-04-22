import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Notification {
  id: number;
  userId: number;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export interface ToastNotification {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8082/api/notifications';
  
  // Subject for toast notifications
  private toastSubject = new Subject<ToastNotification>();
  public toast$ = this.toastSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}`);
  }

  getUnreadNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/${userId}/unread`);
  }

  getUnreadNotificationsCount(userId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/user/${userId}/unread/count`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${notificationId}/read`, {});
  }

  markAllAsRead(userId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/user/${userId}/read-all`, {});
  }

  // Method for showing toast notifications
  showToast(message: string, type: 'success' | 'error' | 'info' = 'success', duration: number = 3000): void {
    this.toastSubject.next({
      message,
      type,
      duration
    });
  }
}