const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchNotifications() {
  const response = await fetch(`${API_BASE_URL}/notifications`);
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
}

export async function createNotification(data: Partial<Notification>) {
  const response = await fetch(`${API_BASE_URL}/notifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create notification');
  return response.json();
}

export async function updateNotificationStatus(id: string, status: NotificationStatus) {
  const response = await fetch(`${API_BASE_URL}/notifications/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update notification status');
  return response.json();
}

export async function updatePreferences(userId: string, preferences: NotificationPreferences) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/preferences`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  if (!response.ok) throw new Error('Failed to update preferences');
  return response.json();
}