# Notification System Backend

A Node.js/Express backend service for managing notifications with MongoDB and Socket.IO integration.

## Features

- RESTful API endpoints for notification management
- Real-time notifications using Socket.IO
- MongoDB integration for data persistence
- TypeScript support
- CORS enabled for cross-origin requests

## Prerequisites

- Node.js
- MongoDB
- npm/yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add the following environment variables:
```env
MONGODB_URI=mongodb://localhost:27017/notification-system
PORT=5000
```
4. Start the server:
```bash
npm start
```

## API Endpoints

- GET `/notifications`: Get all notifications
- POST `/notifications`: Create a new notification
- PUT `/notifications/:id`: Update a notification
- DELETE `/notifications/:id`: Delete a notification

## Data Model

```json
{
  type: "email" | "push" | "in-app",
  message: string,
  recipients: string[],
  scheduledTime: Date,
  status: "pending" | "sent" | "failed"
}
```

## WebSocket Events

- `notification:create`: Triggered when a new notification is created
- `notification:update`: Triggered when a notification is updated
- `notification:delete`: Triggered when a notification is deleted


## Technologies

- Node.js
- Express
- MongoDB
- Socket.IO
- TypeScript




