export type NotificationType = 'email' | 'push' | 'in-app';
export type NotificationStatus = 'sent' | 'delivered' | 'failed';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  scheduledFor?: string;
  createdAt: string;
  targetGroups?: string[];
  failureReason?: string;
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