# ClinicOS Frontend Setup Guide

**Complete frontend development and deployment guide**

---

## Prerequisites

- Node.js 16+
- npm 8+
- Code editor (VS Code recommended)
- Git

---

## Development Environment Setup

### 1. Navigate to Frontend Directory
```bash
cd AutiSmart-ClinicOS/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create `.env` in frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

**Output:**
```
➜  Local:   http://localhost:5173/
```

### 5. Access Application
Open browser: `http://localhost:5173`

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TherapistDashboard.jsx (320 LOC)
│   │   ├── SessionScheduling.jsx (190 LOC)
│   │   ├── SessionList.jsx (200 LOC)
│   │   ├── SessionDetails.jsx (300 LOC)
│   │   ├── SessionNotes.jsx (100 LOC)
│   │   ├── TreatmentPlanForm.jsx (400 LOC)
│   │   ├── GoalTracker.jsx (150 LOC)
│   │   ├── PatientListCard.jsx (100 LOC)
│   │   ├── CalendarView.jsx (80 LOC)
│   │   ├── Toast.jsx (50 LOC)
│   │   └── ErrorBoundary.jsx (50 LOC)
│   ├── pages/
│   │   ├── LoginPage.jsx (150 LOC)
│   │   ├── TreatmentPlanList.jsx
│   │   ├── TreatmentPlanDetails.jsx
│   │   ├── AdminDashboard.jsx (200 LOC)
│   │   ├── CaregiverPortal.jsx
│   │   └── UnauthorizedPage.jsx
│   ├── context/
│   │   ├── AuthContext.jsx (100 LOC)
│   │   └── ThemeContext.jsx (50 LOC)
│   ├── styles/
│   │   ├── TherapistDashboard.css
│   │   ├── SessionScheduling.css
│   │   ├── SessionList.css
│   │   ├── SessionDetails.css
│   │   ├── SessionNotes.css
│   │   ├── TreatmentPlanForm.css
│   │   ├── GoalTracker.css
│   │   ├── PatientListCard.css
│   │   ├── CalendarView.css
│   │   ├── LoginPage.css
│   │   ├── AdminDashboard.css
│   │   ├── Toast.css
│   │   ├── ErrorBoundary.css
│   │   ├── variables.css (design system)
│   │   └── global.css
│   ├── utils/
│   │   ├── ProtectedRoute.jsx (40 LOC)
│   │   └── api.js
│   ├── App.jsx (200 LOC, main router)
│   └── main.jsx (entry point)
├── public/
│   └── index.html
├── vite.config.js
├── package.json
├── .env
└── .gitignore
```

---

## Key Components

### 1. AuthContext.jsx
Manages global authentication state:
- User login/logout
- Token management
- Role-based access
- User profile

```javascript
// Usage in components
const { user, login, logout, isAuthenticated } = useContext(AuthContext);
```

### 2. ProtectedRoute.jsx
Protects routes based on authentication and roles:

```javascript
// In App.jsx
<ProtectedRoute path="/dashboard" component={TherapistDashboard} requiredRole="therapist" />
```

### 3. TherapistDashboard.jsx
Main dashboard component showing:
- Quick stats
- Recent sessions
- Upcoming appointments
- Patient overview

### 4. SessionScheduling.jsx
Create and manage sessions with:
- Date/time picker
- Patient selection
- Session type selection
- Notes field

### 5. TreatmentPlanForm.jsx
Multi-section form for:
- Plan creation
- Goal setting
- Intervention planning
- Approval workflow

---

## CSS & Design System

### Color System (variables.css)
```css
--primary-color: #7B68EE;      /* Purple */
--accent-color: #61C3B4;       /* Teal */
--dark-bg: #1E1E2E;
--light-bg: #F5F5F5;
--text-primary: #1E1E2E;
--text-secondary: #666;
--border-color: #E0E0E0;
--success: #4CAF50;
--warning: #FF9800;
--error: #F44336;
```

### Dark Theme
```css
[data-theme="dark"] {
  --text-primary: #F5F5F5;
  --text-secondary: #AAA;
  --bg-primary: #1E1E2E;
  --border-color: #333;
}
```

### Responsive Design
```css
/* Mobile First */
@media (max-width: 480px) { }
@media (max-width: 1024px) { }
@media (min-width: 1025px) { }
```

---

## Common Patterns

### Login Flow
```javascript
// 1. User submits login form
// 2. API call to /auth/login
// 3. Token received and stored
// 4. Redirect to dashboard

const handleLogin = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const { token } = await response.json();
  localStorage.setItem('authToken', token);
  navigate('/dashboard');
};
```

### API Calls
```javascript
// Protected endpoint with token
const response = await fetch('/api/sessions', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  }
});
```

### Form Validation
```javascript
const [errors, setErrors] = useState({});

const validateForm = (formData) => {
  const newErrors = {};
  if (!formData.email) newErrors.email = 'Email required';
  if (!formData.title) newErrors.title = 'Title required';
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateForm(formData);
  if (Object.keys(newErrors).length === 0) {
    submitForm();
  } else {
    setErrors(newErrors);
  }
};
```

### Dark Theme Toggle
```javascript
const toggleTheme = () => {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
};
```

---

## Development Workflow

### 1. Create New Component
```bash
# Create file in components/
# MyComponent.jsx (JSX code)
# MyComponent.css (styles)

# Import and use
import MyComponent from './components/MyComponent';
```

### 2. Style Component
- Use CSS variables for colors
- Mobile-first approach
- Support dark theme
- Test responsive design

### 3. Add Error Handling
- Try-catch for API calls
- Validation before submit
- Error messages to user
- Console error logging

### 4. Test Component
- Manual testing in browser
- Check responsive design
- Test dark theme
- Test error states

---

## Performance Optimization

### Code Splitting
```javascript
// Lazy load components
const TherapistDashboard = React.lazy(() => import('./pages/TherapistDashboard'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <TherapistDashboard />
</Suspense>
```

### Memoization
```javascript
// Prevents unnecessary re-renders
const SessionCard = React.memo(({ session }) => {
  return <div>{session.title}</div>;
});
```

### Event Delegation
```javascript
// Single listener for multiple items
<ul onClick={handleClick}>
  {sessions.map(session => (
    <li key={session.id} data-id={session.id}>{session.title}</li>
  ))}
</ul>
```

---

## Debugging

### React Developer Tools
1. Install React DevTools extension
2. Inspect component tree
3. Monitor props and state
4. Track performance

### Console Logging
```javascript
// Log component lifecycle
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');
}, []);

// Log API calls
console.log('API Request:', request);
console.log('API Response:', response);
```

### Network Tab
- Monitor API calls
- Check response times
- Verify correct endpoints
- Debug CORS issues

---

## Building for Production

### Build Command
```bash
npm run build
```

**Output:**
- Minified code
- Optimized assets
- Source maps (optional)
- Bundle size: ~150KB gzipped

### Production Checklist
- [ ] Remove console.log() statements
- [ ] Update API URL to production
- [ ] Test in production mode
- [ ] Verify dark theme toggle
- [ ] Test all forms
- [ ] Check responsive design
- [ ] Monitor performance

### Deployment Commands
```bash
# Build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel deploy

# Deploy to Netlify
netlify deploy
```

---

## Environment Variables

### Development (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ENV=development
```

### Production (.env.production)
```env
VITE_API_URL=https://api.clinicos.app/api
VITE_ENV=production
```

### Accessing in Code
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.VITE_ENV === 'development';
```

---

## Troubleshooting

### Port 5173 Already in Use
```bash
# Find and kill process
lsof -i :5173
kill -9 <PID>

# Or use different port
npm run dev -- --port 5174
```

### Module Resolution Error
```
Error: Cannot find module
→ Check import path
→ Verify file exists
→ Check file extension
```

### Blank Page on Load
- Check browser console for errors
- Verify API URL in .env
- Check network requests
- Ensure backend is running

### Style Not Applying
- Check CSS file is imported
- Verify selector syntax
- Check for CSS conflicts
- Use browser dev tools

---

## Useful Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (if available)
npm run lint

# Run tests (if available)
npm run test
```

---

## Best Practices

1. **Always use components** - Break UI into reusable pieces
2. **Use context for global state** - Avoid prop drilling
3. **Validate inputs** - Both client and server
4. **Handle errors gracefully** - User feedback
5. **Test responsive design** - Multiple devices
6. **Optimize performance** - Code splitting, memoization
7. **Follow naming conventions** - Clear, descriptive names
8. **Write inline comments** - Explain complex logic
9. **Use CSS variables** - Easy theme switching
10. **Keep components small** - Single responsibility

---

**Last Updated**: March 2026
**Version**: 1.0.0
