import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import AuthProvider from "../components/AuthProvider";
import ProtectedRoute from "../components/ProtectRoute";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
