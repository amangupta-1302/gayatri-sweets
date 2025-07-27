import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { authUser, isCheckingAuth, checkAuthUser } = useAuthStore();

  useEffect(() => {
    checkAuthUser();
  }, []);

  useEffect(() => {
    if (authUser) {
      console.log("User logged in: ", authUser);
    } else {
      console.log("No authenticated user");
    }
  }, [authUser]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full size-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating your session...</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
