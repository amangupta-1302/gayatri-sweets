import { type IAuthModalProps } from "../utils/types/auth";
import useSignupForm from "../hooks/useSignupForm";
import ModalPopup from "../components/ModalPopup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { Loader2 } from "lucide-react";

const SignupModal: React.FC<IAuthModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}) => {
  const {
    formData,
    setFormData,
    isSigningUp,
    resetForm,
    handleSubmit,
    showPassword,
    setShowPassword,
  } = useSignupForm(() => onClose());

  const handleLogin = () => {
    resetForm();
    onSwitchToLogin?.(); // open login modal
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalPopup
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Account"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME FIELD */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your full name"
            required
            disabled={isSigningUp}
          />
        </div>

        {/* PHONE FIELD */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter 10-digit phone number"
            required
            disabled={isSigningUp}
          />
        </div>

        {/* EMAIL FIED (OPTIONAL) */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email (Optional)
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your email"
            disabled={isSigningUp}
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
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter password (min 6 characters)"
              required
              disabled={isSigningUp}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isSigningUp}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <EyeSlashIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSigningUp}
          className="w-full bg-yellow-600 text-white font-medium py-2 px-4 rounded hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {isSigningUp && <Loader2 className="size-4 animate-spin" />}
          {isSigningUp ? "Creating Account..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            className="text-primary hover:text-primary/80 underline-offset-4 hover:underline font-medium disabled:opacity-50"
            onClick={handleLogin}
            disabled={isSigningUp}
          >
            Log In
          </button>
        </div>
      </form>
    </ModalPopup>
  );
};

export default SignupModal;
