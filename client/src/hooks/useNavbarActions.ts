import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const useNavbarActions = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [formModal, setFormModal] = useState({
    showLoginModal: false,
    showLogoutModal: false,
    showSignupModal: false,
  });
  const [protectedRouteCallback, setProtectedRouteCallback] = useState<
    (() => void) | null
  >(null);

  const onLoginClick = () => {
    setFormModal((prev) => ({ ...prev, showLoginModal: true }));
  };

  useEffect(() => {
    const handleOpenLogin = (event: CustomEvent) => {
      onLoginClick();

      //store the callback if provided from protected Route
      if (event.detail?.onClose) {
        setProtectedRouteCallback(() => event.detail.onClose);
      }
    };
    window.addEventListener("openLoginModal", handleOpenLogin as EventListener);
    return () => {
      window.removeEventListener(
        "openLoginModal",
        handleOpenLogin as EventListener
      );
    };
  }, []);

  const actionLoginClose = () => {
    setFormModal((prev) => ({ ...prev, showLoginModal: false }));

    if (protectedRouteCallback && !authUser) {
      //dispatchEvent to trigger callback
      window.dispatchEvent(new CustomEvent("loginModalClose"));
      protectedRouteCallback();
      setProtectedRouteCallback(null);
    }
  };

  const actionSignupClose = () => {
    setFormModal((prev) => ({ ...prev, showSignupModal: false }));

    if (protectedRouteCallback && !authUser) {
      window.dispatchEvent(new CustomEvent("loginModalClose"));
      protectedRouteCallback();
      setProtectedRouteCallback(null);
    }
  };

  const switchToLogin = () => {
    setFormModal((prev) => ({ ...prev, showSignupModal: false }));
    setTimeout(() => {
      setFormModal((prev) => ({ ...prev, showLoginModal: true }));
    }, 200);
  };

  const switchToSignup = () => {
    setFormModal((prev) => ({ ...prev, showLoginModal: false }));
    setTimeout(() => {
      setFormModal((prev) => ({ ...prev, showSignupModal: true }));
    }, 200);
  };

  const onProfileClick = () => {
    navigate("/profile");
  };

  const onLogoutClick = async () => {
    setFormModal((prev) => ({ ...prev, showLogoutModal: true }));
  };
  const closeLogoutModal = () => {
    setFormModal((prev) => ({ ...prev, showLogoutModal: false }));
  };

  const handleLogoutConfirm = () => {
    setFormModal((prev) => ({ ...prev, showLogoutModal: false }));
    navigate("/"); // navigate to home page
  };

  return {
    // States
    authUser,
    formModal,
    onLoginClick,
    actionLoginClose,
    handleLogoutConfirm,
    actionSignupClose,
    switchToLogin,
    switchToSignup,
    onProfileClick,
    onLogoutClick,
    closeLogoutModal,
  };
};
