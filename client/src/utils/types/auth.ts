import { type IUser } from "./user";

//registerform interface
export interface IRegisterForm {
  name: string;
  email?: string;
  phone: string;
  password: string;
}

//Login form interface
export interface ILoginForm {
  emailOrPhone: string;
  password: string;
}

export interface IPasswordUpdateForm {
  currentPassword: string;
  newPassword: string;
}

// Auth Store interface
export interface IUseAuthStore {
  authUser: IUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  isUpdatingPassword: boolean;

  signup: (formData: IRegisterForm) => Promise<void>;
  login: (formData: ILoginForm) => Promise<void>;
  logout: () => Promise<void>;
  updatePassword: (formData: IPasswordUpdateForm) => Promise<void>;
  checkAuthUser: () => Promise<void>;
}

//Login/Signup popup interface
export interface IAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
  onSwitchToSignup?: () => void;
}

//logout interface
export interface ILogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
