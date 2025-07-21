import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import type { ILogoutModalProps } from "../utils/types/auth";
import ModalPopup from "../components/ModalPopup";
import { AlertTriangle, Loader2 } from "lucide-react";

const LogoutModal: React.FC<ILogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { logout } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      onConfirm(); //close modal and handle success
    } catch (err) {
      console.error("Logout failed : ", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ModalPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Logout"
      size="sm"
      closeOnOverlayClick={!isLoggingOut} // prevent closing popup during logout
    >
      <div className="space-y-6">
        {/* WARNING ICON AND MESSAGE */}
        <div className="flex justify-center">
          <AlertTriangle className="size-12 text-yellow-600" />
        </div>

        <div className="text-center">
          <p className="text-sm text-foreground">
            Are you sure you want to log out? You'll need to sign in again to
            access your account.
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex space-x-3 mt-8">
        {/* CANCEL BUTTON */}

        <button
          type="button"
          onClick={onClose}
          disabled={isLoggingOut}
          className="flex-1 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Cancel
        </button>

        {/* CONFIRM LOGOUT BUTTON */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex-1 bg-red-600 text-white font-medium py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {isLoggingOut && <Loader2 className="size-4 animate-spin" />}
          {isLoggingOut ? "Logging Out" : "Log Out"}
        </button>
      </div>
    </ModalPopup>
  );
};

export default LogoutModal;
