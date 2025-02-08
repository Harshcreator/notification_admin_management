export type NotificationType = 'email' | 'push' | 'in-app';
export type NotificationStatus = 'sent' | 'delivered' | 'failed';

export interface Notification {
  id: string;
  type: 'email' | 'push' | 'in-app';
  recipients: string[];
  message: string;
  scheduledTime?: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface User {
  id: string;
  role: string;
  region: string;
  preferences: NotificationPreferences;
}