// src/app/models/notification.model.ts
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