import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { customModalContent } from "../utils/constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isCheckingAuth, authUser } = useAuthStore();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const hasHydrated = useAuthStore.persist?.hasHydrated?.() ?? true;

  useEffect(() => {
    if (hasHydrated && !isCheckingAuth && !authUser) {
      // Dispatch custom event to opne login modal
      const modalContent = customModalContent(location.pathname);
      window.dispatchEvent(
        new CustomEvent("openLoginModal", {
          detail: {
            context: {
              route: location.pathname,
              title: modalContent.title,
              message: modalContent.message,
            },
            onClose: () => setShouldRedirect(true),
            // redirect when modal closes
          },
        })
      );
    }
  }, [hasHydrated, authUser, isCheckingAuth]);

  useEffect(() => {
    const handleModalClose = () => {
      if (!authUser) {
        setShouldRedirect(true);
      }
    };
    window.addEventListener("loginModalClose", handleModalClose);
    return () => {
      window.removeEventListener("loginModalClose", handleModalClose);
    };
  }, [authUser]);

  if (!hasHydrated || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full size-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }
  if (!authUser) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
            <div className="mb-4">
              <div className="mx-auto flex items-center justify-center size-12 rounded-full bg-yellow-100">
                <svg
                  className="size-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Login Required !
            </h2>
            <p className="text-gray-600 mb-4">
              Please login or create an account to access this page
            </p>
            <div className="animate-pulse text-sm text-gray-500">
              Opening Login modal...
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
