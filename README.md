# ClinicOS

### Therapy Operations Platform for Autism-Care Workflows

ClinicOS is a full-stack web application designed to organize therapy operations around **patients, therapy sessions, treatment plans, therapist workflows, and progress tracking**.

> **Portfolio note:** ClinicOS is presented as a software project demonstrating full-stack architecture, authentication, RBAC, database design, and healthcare-style workflow management. It is not a medical device or clinical system.

## 🚀 Quick Links

- **Source Code:** https://github.com/AliShah1029384756/ClinicOS
- **Live Demo:** No public deployment currently listed; run locally using the setup below.

## ✨ Key Features

- 👤 Patient and therapist workflow management
- 📅 Therapy session scheduling and status tracking
- 📝 Treatment plan creation and progress updates
- 📊 Progress tracking and dashboard-oriented analytics
- 🔐 JWT authentication and role-based access control
- 👥 Role-aware workflows for therapists, administrators, caregivers, and patients
- 📱 Responsive React interface
- 🌙 Dark-theme support
- 🔌 RESTful backend API

## 🛠️ Technology Stack

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
- Role-based authorization

## 🏗️ Architecture

```text
React + Vite Frontend
        │
        │ REST API
        ▼
Node.js + Express Backend
        │
        ├── Authentication / RBAC
        ├── Session Management
        ├── Treatment Plans
        ├── Therapist Workflows
        └── Progress / Statistics
        │
        ▼
MongoDB + Mongoose
```

## 📁 Project Structure

```text
ClinicOS/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   └── package.json
├── API_DOCUMENTATION.md
├── FRONTEND_SETUP_GUIDE.md
├── PROJECT_GUIDE.md
├── CLINICOS_COMPLETION_REPORT.md
├── CHANGELOG.md
└── README.md
```

## 🔌 Core API Areas

The backend is organized around REST endpoints for:

- **Authentication** — login and account/session workflows
- **Sessions** — scheduling, status, attendance, filtering, and session details
- **Treatment Plans** — creation, updates, progress, approval, and history
- **Therapists** — profiles, availability, and statistics

See [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) for the detailed API reference.

## 🔐 Authentication & Security

ClinicOS uses JWT-based authentication and role-aware authorization middleware.

Environment-specific secrets are supplied through `.env` and excluded from version control. A safe development template is provided at [`backend/.env.example`](backend/.env.example).

For deployment, configure:

- Strong, unique JWT secrets
- Restricted CORS origins
- HTTPS
- Restricted MongoDB network access
- Secure credential storage
- Appropriate authentication rate limiting
- Safe application logging

## ⚙️ Local Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/AliShah1029384756/ClinicOS.git
cd ClinicOS
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update the values for your local environment.

### 3. Start the backend

```bash
npm start
```

Default backend port:

```text
http://localhost:5000
```

### 4. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Default Vite development URL:

```text
http://localhost:5173
```

## 📚 Documentation

Additional project documentation is available in the repository:

- [`API_DOCUMENTATION.md`](API_DOCUMENTATION.md) — backend API reference
- [`FRONTEND_SETUP_GUIDE.md`](FRONTEND_SETUP_GUIDE.md) — frontend setup notes
- [`PROJECT_GUIDE.md`](PROJECT_GUIDE.md) — project structure and guidance
- [`CLINICOS_COMPLETION_REPORT.md`](CLINICOS_COMPLETION_REPORT.md) — implementation report
- [`CHANGELOG.md`](CHANGELOG.md) — project changes

## 🧪 Project Scope

ClinicOS demonstrates practical implementation of:

- Full-stack React + Node.js development
- REST API design
- MongoDB/Mongoose data modelling
- JWT authentication
- Role-based access control
- Route-driven dashboard architecture
- Healthcare-style workflow modelling
- Responsive UI and theme support

## ⚠️ Scope & Disclaimer

ClinicOS is an academic/software engineering project. It should not be represented as a clinically validated medical system, and the project documentation should not be interpreted as evidence of clinical certification or production healthcare deployment.

## 📌 Project Status

**Portfolio / academic project — source code available for review and local execution.**

For implementation details, see the completion report and supporting documentation in this repository.

---

⭐ If you find the project useful, consider starring the repository.
