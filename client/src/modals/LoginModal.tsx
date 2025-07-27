import { type IAuthModalProps } from "../utils/types/auth";
import ModalPopup from "../components/ModalPopup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Loader2 } from "lucide-react";
import useLoginForm from "../hooks/useLoginForm";

const LoginModal: React.FC<IAuthModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignup,
}) => {
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoggingIn,
    handleSubmit,
    resetForm,
  } = useLoginForm(() => onClose());

  const handleSignup = () => {
    resetForm();
    onSwitchToSignup?.(); // open signup modal
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalPopup isOpen={isOpen} onClose={handleClose} title="Log In" size="sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* EMAIL */}
        <div className="space-y-2">
          <label
            htmlFor="emailOrPhone"
            className="text-sm font-medium text-foreground"
          >
            Email / Phone
          </label>
          <input
            type="text"
            id="emailOrPhone"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, emailOrPhone: e.target.value }))
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter email or phone "
            required
            disabled={isLoggingIn}
          />
        </div>
        {/* PASSWORD FIELD */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="Enter Password"
              required
              disabled={isLoggingIn}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoggingIn}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground disabled:opacity-50"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-yellow-600 text-white font-medium py-2 px-4 rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {isLoggingIn && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoggingIn ? "logging in.." : "Log In"}
        </button>

        {/* SIGNUP */}
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-primary hover:text-primary/80 underline-offset-4 hover:underline font-medium"
            onClick={handleSignup}
            disabled={isLoggingIn}
          >
            Sign Up?
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};

export default LoginModal;
