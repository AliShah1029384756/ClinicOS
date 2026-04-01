# ClinicOS Project Guide

**Project structure, guidelines, and best practices**

---

## Project Overview

ClinicOS is a therapy management system for autism specialists. It provides patient management, session scheduling, treatment planning, and progress tracking.

---

## Project Statistics

| Metric | Value |
|--------|-------|
| Frontend Components | 18 |
| Backend Routes | 3 |
| API Endpoints | 25+ |
| MongoDB Models | 3 |
| CSS Files | 15 |
| Frontend LOC | 2,700+ |
| Backend LOC | 978 |
| CSS LOC | 3,500+ |

---

## Folder Structure

```
AutiSmart-ClinicOS/
├── frontend/
│   ├── src/
│   │   ├── components/         ← React components (11 files)
│   │   ├── pages/              ← Page components (6 files)
│   │   ├── context/            ← Context API (2 files)
│   │   ├── styles/             ← CSS files (15 files)
│   │   ├── utils/              ← Utilities (2 files)
│   │   ├── App.jsx             ← Main app
│   │   └── main.jsx            ← Entry point
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── models/                 ← MongoDB models (3 files)
│   │   ├── Session.js
│   │   ├── TreatmentPlan.js
│   │   └── TherapistProfile.js
│   ├── routes/                 ← API routes (3 files)
│   │   ├── sessionRoutes.js
│   │   ├── treatmentPlanRoutes.js
│   │   └── therapistRoutes.js
│   ├── middleware/             ← Auth middleware (1 file)
│   │   └── therapistAuthMiddleware.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── Documentation/
    ├── README.md
    ├── CLINICOS_COMPLETION_REPORT.md
    ├── API_DOCUMENTATION.md
    ├── FRONTEND_SETUP_GUIDE.md
    ├── PROJECT_GUIDE.md (this file)
    ├── ROADMAP.md
    └── [other guides]
```

---

## Technology Stack

### Frontend
- **Framework**: React 18.2+
- **Routing**: React Router v6
- **State**: Context API
- **Styling**: CSS3 with variables
- **Build Tool**: Vite
- **Package Manager**: npm

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Auth**: JWT
- **Package Manager**: npm

### Database
- **Type**: NoSQL (MongoDB)
- **Hosting**: Local or MongoDB Atlas
- **Schema**: Normalized with validation

---

## Component Architecture

### Frontend Layer
```
App.jsx (Router)
  ├── AuthContext (Global Auth State)
  ├── ProtectedRoute (Route Guards)
  │
  ├── LoginPage
  ├── TherapistDashboard
  │   ├── SessionScheduling
  │   ├── SessionList
  │   ├── SessionDetails
  │   ├── TreatmentPlanForm
  │   ├── GoalTracker
  │   └── CalendarView
  ├── AdminDashboard
  ├── CaregiverPortal
  └── UnauthorizedPage
```

### Backend Layer
```
Server (app.js)
  ├── Auth Routes (/auth/login)
  ├── Session Routes (/sessions)
  │   ├── GET all sessions
  │   ├── POST create session
  │   ├── GET/PUT/:id update
  │   └── PATCH attendance
  ├── Treatment Plan Routes (/treatment-plans)
  │   ├── CRUD operations
  │   ├── Progress tracking
  │   └── Approval workflow
  └── Therapist Routes (/therapists)
      ├── CRUD operations
      ├── Stats retrieval
      └── Availability setting
```

---

## API Endpoints Summary

### Sessions (7)
- `GET /sessions` - List
- `POST /sessions` - Create
- `GET /sessions/:id` - Get
- `PUT /sessions/:id` - Update
- `DELETE /sessions/:id` - Delete
- `GET /sessions/therapist/:id` - Filter
- `PATCH /sessions/:id/attendance` - Attendance

### Treatment Plans (9)
- `GET /treatment-plans` - List
- `POST /treatment-plans` - Create
- `GET /treatment-plans/:id` - Get
- `PUT /treatment-plans/:id` - Update
- `DELETE /treatment-plans/:id` - Delete
- `PATCH /treatment-plans/:id/progress` - Progress
- `POST /treatment-plans/:id/approve` - Approve
- `GET /treatment-plans/:id/history` - History

### Therapists (7)
- `GET /therapists` - List
- `POST /therapists` - Create
- `GET /therapists/:id` - Get
- `PUT /therapists/:id` - Update
- `DELETE /therapists/:id` - Delete
- `GET /therapists/:id/stats` - Stats
- `POST /therapists/:id/availability` - Availability

---

## Database Schema

### Session
- sessionId (unique)
- therapistId (ref)
- patientId (ref)
- title, description
- startTime, endTime, duration
- type (individual/group)
- status (scheduled/in-progress/completed/cancelled)
- notes
- attendanceRecorded
- timestamps

### TreatmentPlan
- planId (unique)
- patientId (ref)
- therapistId (ref)
- title, description
- status (draft/active/completed/archived)
- goals (array)
- interventions (array)
- duration, startDate, endDate
- progress (0-100)
- timestamps

### TherapistProfile
- userId (ref)
- name, email
- specialty (array)
- credentials (array)
- licenseNumber
- yearsOfExperience
- availability (object)
- caseLoad
- bio
- timestamps

---

## Development Conventions

### File Naming
- Components: PascalCase (SessionScheduling.jsx)
- Styles: Match component (SessionScheduling.css)
- Utilities: camelCase (apiHelper.js)
- Context: PascalCase (AuthContext.jsx)

### Code Style
- Use arrow functions
- Use const/let (not var)
- Add JSDoc comments for functions
- Keep functions small (< 100 LOC)
- Use semantic HTML

### CSS Conventions
- Use CSS variables for colors
- Mobile-first responsive
- BEM naming for classes
- Dark theme support
- Accessibility focus

---

## Component Development Guide

### Creating a Component
```javascript
// 1. File structure
components/
├── MyComponent.jsx    (Logic)
└── MyComponent.css    (Styles)

// 2. Component template
import React, { useState } from 'react';
import './MyComponent.css';

export default function MyComponent({ prop1, prop2 }) {
  const [state, setState] = useState(null);
  
  const handleSelect = (value) => {
    setState(value);
  };
  
  return (
    <div className="my-component">
      {/* JSX here */}
    </div>
  );
}

// 3. Import in App or parent
import MyComponent from './components/MyComponent';
```

### Best Practices
1. ✅ Use functional components
2. ✅ Use hooks for state
3. ✅ Prop validation
4. ✅ Error handling
5. ✅ Loading states
6. ✅ Responsive design
7. ✅ Dark theme support
8. ✅ Accessibility

---

## State Management

### Context API Usage
```javascript
// AuthContext provides user data globally
const { user, login, logout, isAuthenticated } = useContext(AuthContext);

// Access in any component
useEffect(() => {
  if (!isAuthenticated) {
    navigate('/login');
  }
}, [isAuthenticated]);
```

### Local State
```javascript
// Component-specific state
const [sessions, setSessions] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

---

## API Interaction

### Fetch Pattern
```javascript
const fetchSessions = async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/sessions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    const data = await response.json();
    setSessions(data.data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Error Handling
```javascript
if (error) {
  return <div className="error-message">{error}</div>;
}

if (loading) {
  return <div className="spinner">Loading...</div>;
}

if (sessions.length === 0) {
  return <div className="empty-state">No sessions found</div>;
}
```

---

## Testing Approach

### Manual Testing
1. Test all CRUD operations
2. Verify role-based access
3. Check responsive design
4. Test dark theme
5. Check error states
6. Verify API failures handled

### Test Scenarios
- Create, read, update, delete records
- Filter and sort data
- Test pagination
- Verify form validation
- Check authentication flow

---

## Performance Optimization

### Frontend
- React.memo for expensive components
- Lazy loading of routes
- Image optimization
- CSS minification
- Code splitting

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Caching strategies
- Pagination

---

## Security Practices

### Authentication
- JWT tokens with expiration
- Refresh token rotation
- Secure token storage
- Protected routes

### Data Protection
- Input validation
- Output encoding
- SQL injection prevention
- XSS protection
- CSRF tokens

---

## Deployment

### Frontend
- Build: `npm run build`
- Deploy to: Vercel, Netlify, S3
- CDN for assets

### Backend
- Deploy to: Heroku, Railway, AWS
- Environment variables configured
- Database connectivity ensured
- Logging enabled

---

## Common Issues & Solutions

### Issue: API not responding
**Solution**: Check backend is running, verify CORS_ORIGIN

### Issue: Authentication fails
**Solution**: Verify JWT_SECRET, check token format

### Issue: Styles not applied
**Solution**: Check CSS import, verify selector

### Issue: Dark theme not working
**Solution**: Check data-theme attribute, verify CSS variables

---

## Future Enhancements

### Phase 2
- Advanced analytics
- Report generation
- Email notifications
- Mobile app

### Phase 3
- AI progress prediction
- Video telemedicine
- Insurance integration
- Advanced search

---

## Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Guide](https://mongoosejs.com)
- [JWT Explained](https://jwt.io)
- [Vite Guide](https://vitejs.dev)

---

**Last Updated**: March 2026
**Version**: 1.0.0
