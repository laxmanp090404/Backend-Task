# Task Management API

## Overview
This is a RESTful API for a task management system built using Node.js, Express, MongoDB, and JWT authentication. The API allows for user registration, authentication, and management of tasks.

## Deployed API Base URL

```
https://backend-task-enai.onrender.com
```

## Local Base URL

```
http://localhost:5000
```

## Authentication
The API uses JSON Web Tokens (JWT) for authentication. Most endpoints require a valid JWT token which should be included in the Authorization header using the Bearer scheme.

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication

#### Login User
```
POST /auth
```

**Request Body**
```json
{
  "useremail": "user@example.com",
  "password": "password123"
}
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "useremail": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**
- **401 Unauthorized**: Invalid username or password
- **400 Bad Request**: Missing required fields
- **500 Internal Server Error**: Server error

### User Management

#### Register User
```
POST /users
```

**Request Body**
```json
{
  "username": "johndoe",
  "useremail": "user@example.com",
  "password": "password123"
}
```

**Success Response (201 Created)**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "useremail": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses**
- **400 Bad Request**: User already exists or validation errors
- **500 Internal Server Error**: Server error

#### Get All Users
```
GET /users
```

**Headers**
```
Authorization: Bearer <token>
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "useremail": "user@example.com"
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "username": "janedoe",
      "useremail": "jane@example.com"
    }
  ]
}
```

**Error Responses**
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**: Server error

#### Get User by ID
```
GET /users/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "useremail": "user@example.com"
  }
}
```

**Error Responses**
- **400 Bad Request**: Invalid user ID format
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: User not found with this ID
- **500 Internal Server Error**: Server error

#### Update User
```
PUT /users/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Request Body** (all fields optional)
```json
{
  "username": "johndoe_updated",
  "useremail": "updated_user@example.com"
}
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe_updated",
    "useremail": "updated_user@example.com"
  }
}
```

**Error Responses**
- **400 Bad Request**: Invalid user ID format or email/username already exists
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: User not found with this ID
- **500 Internal Server Error**: Server error

### Task Management

#### Get All Tasks
```
GET /tasks
```

**Headers**
```
Authorization: Bearer <token>
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "60d21b4667d0d8992e610c87",
      "title": "Complete project"
    },
    {
      "_id": "60d21b4667d0d8992e610c88",
      "title": "Review code"
    }
  ]
}
```

**Error Responses**
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**: Server error

#### Get Task by ID
```
GET /tasks/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "Complete project",
    "description": "Finish the backend API development",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "status": "pending",
    "assignedUser": {
      "_id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "useremail": "user@example.com"
    },
    "createdAt": "2023-06-23T10:00:00.000Z",
    "updatedAt": "2023-06-23T10:00:00.000Z"
  }
}
```

**Error Responses**
- **400 Bad Request**: Invalid task ID format
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: Task not found with this ID
- **500 Internal Server Error**: Server error

#### Create Task
```
POST /tasks
```

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "title": "Complete project",
  "description": "Finish the backend API development",
  "dueDate": "2023-12-31T00:00:00.000Z",
  "assignedUser": "60d21b4667d0d8992e610c85"
}
```

**Success Response (201 Created)**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "Complete project",
    "description": "Finish the backend API development",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "status": "pending",
    "assignedUser": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-23T10:00:00.000Z",
    "updatedAt": "2023-06-23T10:00:00.000Z"
  }
}
```

**Error Responses**
- **400 Bad Request**: Missing required fields or validation errors
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: Assigned user not found
- **500 Internal Server Error**: Server error

#### Update Task
```
PUT /tasks/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Request Body** (all fields optional)
```json
{
  "title": "Updated project title",
  "description": "Updated description",
  "status": "in-progress",
  "dueDate": "2023-12-31T00:00:00.000Z"
}
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c87",
    "title": "Updated project title",
    "description": "Updated description",
    "dueDate": "2023-12-31T00:00:00.000Z",
    "status": "in-progress",
    "assignedUser": {
      "_id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "useremail": "user@example.com"
    },
    "createdAt": "2023-06-23T10:00:00.000Z",
    "updatedAt": "2023-06-23T10:30:00.000Z"
  }
}
```

**Error Responses**
- **400 Bad Request**: Invalid task ID format, invalid status value
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: Task not found with this ID
- **500 Internal Server Error**: Server error

#### Delete Task
```
DELETE /tasks/:id
```

**Headers**
```
Authorization: Bearer <token>
```

**Success Response (200 OK)**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses**
- **400 Bad Request**: Invalid task ID format
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: Task not found with this ID
- **500 Internal Server Error**: Server error

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid input, validation errors
- **401 Unauthorized**: Authentication errors
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information (only in development)"
}
```

## Setup and Installation

1. Clone the repository
2. Install dependencies: 
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DEV_MODE=development
   MONGO_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_jwt_secret_key_here
   ```
4. Run the server:
   - Development: `npm run dev`
   - Production: `npm start`

## Authentication Flow

1. Register a user with `/users` endpoint
2. Login with `/auth` endpoint to receive a JWT token
3. Include the token in the Authorization header for protected