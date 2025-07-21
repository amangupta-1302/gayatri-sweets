import { type ILoginForm, type IRegisterForm } from "./auth";

//useLoginForm - hook interface
export interface IUseLoginFormReturn {
  formData: ILoginForm;
  setFormData: React.Dispatch<React.SetStateAction<ILoginForm>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggingIn: boolean;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

// useSignupForm - hook interface
export interface IUseSignupFormReturn {
  formData: IRegisterForm;
  setFormData: React.Dispatch<React.SetStateAction<IRegisterForm>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSigningUp: boolean;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}
