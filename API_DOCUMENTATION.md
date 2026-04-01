# ClinicOS API Documentation

**Complete API reference for all ClinicOS endpoints**

---

## Base URL

**Development**: `http://localhost:5000/api`
**Production**: `https://api.clinicos.app/api`

---

## Authentication

All endpoints (except `/auth/login`) require JWT authentication:

```
Authorization: Bearer <token>
Content-Type: application/json
```

### Get Token
```http
POST /auth/login
Content-Type: application/json

{
  "email": "therapist@clinic.com",
  "password": "demo@123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "therapist@clinic.com",
    "role": "therapist"
  }
}
```

---

## Sessions API

### List All Sessions
```http
GET /sessions
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)
- `status` (optional): Filter by status (scheduled/in-progress/completed/cancelled)
- `therapistId` (optional): Filter by therapist
- `patientId` (optional): Filter by patient

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "sessionId": "SES001",
      "therapistId": "507f1f77bcf86cd799439011",
      "patientId": "507f1f77bcf86cd799439013",
      "title": "Speech Therapy Session",
      "description": "Focus on articulation exercises",
      "startTime": "2026-03-30T10:00:00Z",
      "endTime": "2026-03-30T11:00:00Z",
      "duration": 60,
      "type": "individual",
      "status": "scheduled",
      "notes": "Patient showed good progress",
      "attendanceRecorded": false,
      "createdAt": "2026-03-30T08:00:00Z",
      "updatedAt": "2026-03-30T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Create Session
```http
POST /sessions
Authorization: Bearer <token>
Content-Type: application/json

{
  "therapistId": "507f1f77bcf86cd799439011",
  "patientId": "507f1f77bcf86cd799439013",
  "title": "Speech Therapy Session",
  "description": "Focus on articulation exercises",
  "startTime": "2026-03-30T10:00:00Z",
  "endTime": "2026-03-30T11:00:00Z",
  "type": "individual"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "sessionId": "SES001",
    "status": "scheduled"
  }
}
```

### Get Session Details
```http
GET /sessions/:id
Authorization: Bearer <token>
```

**Response:** Single session object (see list response format)

### Update Session
```http
PUT /sessions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "in-progress",
  "notes": "Patient is engaged"
}
```

### Delete Session
```http
DELETE /sessions/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

### Record Attendance
```http
PATCH /sessions/:id/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "attendanceRecorded": true,
  "notes": "Patient attended on time"
}
```

### Get Therapist Sessions
```http
GET /sessions/therapist/:therapistId
Authorization: Bearer <token>
```

---

## Treatment Plans API

### List All Plans
```http
GET /treatment-plans
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Results per page
- `status` (optional): Filter by status
- `therapistId` (optional): Filter by therapist
- `patientId` (optional): Filter by patient

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "planId": "TP001",
      "patientId": "507f1f77bcf86cd799439013",
      "therapistId": "507f1f77bcf86cd799439011",
      "title": "6-Week Speech Therapy Plan",
      "description": "Comprehensive speech improvement program",
      "status": "active",
      "goals": [
        {
          "goalId": "G001",
          "description": "Improve articulation",
          "targetDate": "2026-05-30",
          "status": "on-track",
          "progress": 60
        }
      ],
      "duration": 6,
      "startDate": "2026-03-30",
      "endDate": "2026-05-30",
      "progress": 60,
      "createdAt": "2026-03-30T08:00:00Z",
      "updatedAt": "2026-03-30T08:00:00Z"
    }
  ]
}
```

### Create Treatment Plan
```http
POST /treatment-plans
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": "507f1f77bcf86cd799439013",
  "therapistId": "507f1f77bcf86cd799439011",
  "title": "6-Week Speech Therapy Plan",
  "description": "Comprehensive speech improvement program",
  "status": "draft",
  "goals": [
    {
      "description": "Improve articulation",
      "targetDate": "2026-05-30"
    }
  ],
  "duration": 6
}
```

### Get Plan Details
```http
GET /treatment-plans/:id
Authorization: Bearer <token>
```

### Update Treatment Plan
```http
PUT /treatment-plans/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active",
  "progress": 75
}
```

### Update Plan Progress
```http
PATCH /treatment-plans/:id/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "progress": 75,
  "notes": "Significant improvement observed"
}
```

### Approve Plan
```http
POST /treatment-plans/:id/approve
Authorization: Bearer <token>
```

### Get Plan History
```http
GET /treatment-plans/:id/history
Authorization: Bearer <token>
```

### Delete Treatment Plan
```http
DELETE /treatment-plans/:id
Authorization: Bearer <token>
```

---

## Therapists API

### List All Therapists
```http
GET /therapists
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "user123",
      "name": "Dr. Sarah Johnson",
      "email": "therapist@clinic.com",
      "specialty": ["Speech", "Occupational"],
      "credentials": [
        {
          "type": "CCC-SLP",
          "issuedDate": "2015-06-15",
          "expiryDate": "2025-06-15"
        }
      ],
      "yearsOfExperience": 8,
      "caseLoad": 15,
      "availability": {
        "monday": ["09:00", "17:00"],
        "wednesday": ["09:00", "15:00"]
      },
      "createdAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

### Create Therapist
```http
POST /therapists
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user123",
  "name": "Dr. Sarah Johnson",
  "email": "therapist@clinic.com",
  "specialty": ["Speech", "Occupational"],
  "credentials": [
    {
      "type": "CCC-SLP",
      "issuedDate": "2015-06-15",
      "expiryDate": "2025-06-15"
    }
  ],
  "yearsOfExperience": 8
}
```

### Get Therapist Profile
```http
GET /therapists/:id
Authorization: Bearer <token>
```

### Update Therapist Profile
```http
PUT /therapists/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "caseLoad": 12,
  "availability": {
    "monday": ["09:00", "17:00"],
    "wednesday": ["09:00", "15:00"]
  }
}
```

### Get Therapist Statistics
```http
GET /therapists/:id/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "therapistId": "507f1f77bcf86cd799439011",
    "totalSessions": 45,
    "completedSessions": 40,
    "upcomingSessions": 5,
    "totalPatients": 12,
    "averageSessionDuration": 55,
    "cancellationRate": 2.2,
    "utilization": 85
  }
}
```

### Set Availability
```http
POST /therapists/:id/availability
Authorization: Bearer <token>
Content-Type: application/json

{
  "availability": {
    "monday": ["09:00", "17:00"],
    "tuesday": ["09:00", "12:00"],
    "wednesday": ["13:00", "17:00"],
    "thursday": ["09:00", "17:00"],
    "friday": ["09:00", "15:00"]
  }
}
```

### Delete Therapist
```http
DELETE /therapists/:id
Authorization: Bearer <token>
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Invalid request data",
  "details": {
    "field": "error message"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication Error",
  "message": "No token provided or token expired"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Authorization Error",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Headers**: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset

---

## Pagination

All list endpoints support pagination:
- Default limit: 10
- Max limit: 100
- Default page: 1

**Parameters:**
```
?page=2&limit=20
```

---

**Last Updated**: March 2026
**Version**: 1.0.0
