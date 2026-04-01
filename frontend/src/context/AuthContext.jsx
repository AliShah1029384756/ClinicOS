import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    id: "demo-therapist",
    role: "therapist",
    name: "Demo Therapist",
    email: "therapist@clinic.com",
  });

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (nextUser) => setUser(nextUser),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
