# ClinicOS

## Description
ClinicOS is an autism therapy operations platform designed to manage therapy sessions, therapist workflows, treatment plans, and patient progress tracking in one system.

## Technologies Used
- Languages: JavaScript
- Frameworks/Tools: React (Vite), Node.js, Express.js, Mongoose
- Database: MongoDB
- Authentication: JWT with role-based access control

## Project Structure
- `backend/` API, middleware, models, route handlers
- `frontend/` React app, component screens, UI styles
- `API_DOCUMENTATION.md` API reference
- `CLINICOS_COMPLETION_REPORT.md` implementation summary

## How to Run
1. Backend setup
	- `cd backend`
	- `npm install`
	- Copy `.env.example` to `.env` and set values
	- `npm start`
2. Frontend setup
	- `cd frontend`
	- `npm install`
	- `npm run dev`

Default ports:
- Backend: 5000
- Frontend: 5173

## Key Features
- Session scheduling and status tracking
- Treatment plan creation and progress updates
- Therapist profile and role-aware access
- Structured API design with REST endpoints
- Recovered documentation set for deployment handoff

## Learning Outcomes
- Full-stack module decomposition for healthcare-style workflows
- Practical RBAC and JWT middleware implementation
- Mongoose schema design with index strategy
- React route-driven dashboard architecture

## Demo/Results
- Local demo available after environment configuration.
- Reports and implementation details are documented in `CLINICOS_COMPLETION_REPORT.md` and `PHASE_1_IMPLEMENTATION_REPORT.md`.
