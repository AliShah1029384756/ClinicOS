import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import CaregiverPortal from "./components/CaregiverPortal";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionDetails from "./components/SessionDetails";
import SessionList from "./components/SessionList";
import SessionScheduling from "./components/SessionScheduling";
import TherapistDashboard from "./components/TherapistDashboard";
import TreatmentPlanForm from "./components/TreatmentPlanForm";
import UnauthorizedPage from "./components/UnauthorizedPage";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<TherapistDashboard />} />
              <Route path="/sessions" element={<SessionList />} />
              <Route path="/sessions/new" element={<SessionScheduling />} />
              <Route path="/sessions/:id" element={<SessionDetails />} />
              <Route path="/treatment-plan" element={<TreatmentPlanForm />} />
              <Route path="/caregiver" element={<CaregiverPortal />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
