# ClinicOS Project Guide

**Project structure, architecture, security guidance, and development notes**

---

## Project Overview

ClinicOS is a full-stack therapy-operations application for autism-care workflows. It demonstrates patient-oriented workflow modelling, therapy session management, treatment planning, therapist workflows, authentication, role-based authorization, and progress tracking.

> ClinicOS is an academic/software-engineering project. It is not a clinically validated medical device or production healthcare system.

---

## Technology Stack

### Frontend
- React 18
- Vite
- React Router
- Context API
- CSS3 / CSS custom properties

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- Role-based authorization middleware

### Development
- npm
- Environment variables for secrets and deployment-specific configuration

---

## Architecture

```text
React + Vite Frontend
        │
        ├── AuthContext
        ├── ProtectedRoute
        ├── Therapist Dashboard
        ├── Admin Dashboard
        ├── Caregiver / Patient workflows
        └── Session / Treatment UI
        │
        │ REST API + Bearer JWT
        ▼
Node.js + Express Backend
        │
        ├── Authentication / RBAC
        ├── Session Routes
        ├── Treatment Plan Routes
        ├── Therapist Routes
        └── Validation / Error Handling
        │
        ▼
MongoDB + Mongoose
```

---

## Folder Structure

```text
ClinicOS/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── API_DOCUMENTATION.md
├── FRONTEND_SETUP_GUIDE.md
├── PROJECT_GUIDE.md
├── CLINICOS_COMPLETION_REPORT.md
├── CHANGELOG.md
└── README.md
```

---

## Core Modules

### Authentication & Authorization
JWT-based authentication with role-aware middleware. Protected frontend routes improve navigation control, while authorization must ultimately be enforced by the backend.

### Sessions
- Session listing and filtering
- Therapist-specific views
- Date filtering
- Session creation and editing
- Attendance and status updates
- Role-protected mutations

### Treatment Plans
- Treatment plan creation and updates
- Goal management
- Progress updates
- Status management
- Role-protected mutations

### Therapists
- Therapist profiles
- Availability
- Statistics and workflow support
- Role-aware administration

### Progress
Progress-oriented data and dashboard workflows support tracking of therapy activity and outcomes within the scope of the academic project.

---

## Security Model

ClinicOS separates **authentication** from **authorization**.

### Authentication
Requests to protected API resources require a valid Bearer JWT. Tokens use a configured `JWT_SECRET`; there is no insecure hard-coded fallback secret.

### Authorization
Sensitive mutations are role-protected. Current examples include:

| Operation | Allowed roles |
|---|---|
| Create session | Admin, Therapist |
| Update session | Admin, Therapist |
| Attendance/status updates | Admin, Therapist |
| Delete session | Admin |
| Create treatment plan | Admin, Therapist |
| Update treatment plan | Admin, Therapist |
| Progress/status/goal updates | Admin, Therapist |
| Delete treatment plan | Admin |

> Data-ownership rules for therapist-to-patient assignments should be defined explicitly before introducing stricter record-level restrictions. Do not treat frontend route guards as a security boundary.

### Deployment security checklist
- Use a strong unique `JWT_SECRET`
- Set an explicit production `CORS_ORIGIN`
- Use HTTPS
- Restrict MongoDB network access
- Keep credentials outside version control
- Add authentication rate limiting for production
- Avoid logging sensitive patient information
- Validate and sanitize externally supplied input

---

## Environment Configuration

Backend secrets belong in `.env` and must not be committed.

Use the repository's `.env.example` as the safe configuration template. Typical deployment configuration includes:

```text
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<strong-random-secret>
CORS_ORIGIN=<frontend-origin>
PORT=5000
```

Never place real credentials in source code or documentation.

---

## Local Development

### Backend

```bash
cd backend
npm install
npm start
```

Default development API:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Default Vite URL:

```text
http://localhost:5173
```

---

## API Areas

The backend is organized around these main API areas:

- **Authentication** — login and authenticated sessions
- **Sessions** — scheduling, filtering, attendance, status, and details
- **Treatment Plans** — plans, goals, progress, and status
- **Therapists** — profiles, availability, and statistics

See [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) for the current endpoint reference.

---

## Frontend Architecture

```text
App.jsx
 ├── AuthContext
 ├── ProtectedRoute
 ├── LoginPage
 ├── TherapistDashboard
 │    ├── SessionScheduling
 │    ├── SessionList
 │    ├── SessionDetails
 │    ├── TreatmentPlanForm
 │    ├── GoalTracker
 │    └── CalendarView
 ├── AdminDashboard
 ├── Caregiver / Patient workflows
 └── UnauthorizedPage
```

### Frontend principles
- Keep authentication state centralized.
- Use protected routes for navigation control.
- Handle loading, error, and empty states.
- Keep API communication consistent.
- Maintain responsive and accessible interfaces.
- Do not rely on frontend role checks as the only security mechanism.

---

## Development Conventions

### Naming
- React components: PascalCase
- Utilities: camelCase
- Context modules: PascalCase
- Styles: descriptive component-oriented names

### Code quality
- Prefer `const`/`let` over `var`.
- Keep functions focused and reasonably small.
- Handle asynchronous errors explicitly.
- Avoid duplicated business logic where practical.
- Keep environment-specific values out of source code.

---

## Testing Checklist

Before considering a meaningful backend change complete:

1. Verify authentication with valid and invalid tokens.
2. Verify expired/missing tokens are rejected.
3. Verify role-restricted mutations with each relevant role.
4. Test CRUD operations for affected modules.
5. Test invalid IDs and malformed payloads.
6. Test frontend loading/error/empty states.
7. Test responsive layouts.
8. Test the development environment after environment-variable changes.

For security-sensitive changes, also verify that authorization is enforced server-side rather than only through frontend visibility.

---

## Performance Considerations

Potential production improvements include:

- Pagination for large datasets
- Database indexes for frequently queried fields
- Query projection and population discipline
- Route-level code splitting
- Optimized assets
- Appropriate caching

These should be introduced based on measured needs rather than added solely for complexity.

---

## Future Enhancements

Potential future work includes:

- Advanced analytics and reporting
- Notifications
- More granular patient/therapist ownership rules
- Automated testing
- Production-grade rate limiting and observability
- AI-assisted progress insights
- Deployment and CI/CD hardening

Future ideas are not represented as current production capabilities.

---

## Project Relationship

ClinicOS belongs to the same broader autism-care problem space as the author's other projects, including **AutiSmart** and **SchoolIEP**. It should be presented as a clinic/therapy-operations-focused application rather than as an unrelated duplicate project.

The exact percentage of reused material should not be claimed publicly unless supported by a documented code/content comparison.

---

## Scope & Disclaimer

ClinicOS is an academic/software-engineering project intended to demonstrate full-stack engineering and healthcare-style workflow modelling. It has not been presented as clinically validated software, a medical device, or evidence of clinical certification.

---

**Last reviewed:** August 2026
**Status:** Portfolio / academic project
