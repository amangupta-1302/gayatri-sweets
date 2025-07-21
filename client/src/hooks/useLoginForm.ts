import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { type ILoginForm } from "../utils/types/auth";
import { type IUseLoginFormReturn } from "../utils/types/hook";

const useLoginForm = (onSuccess: () => void): IUseLoginFormReturn => {
  const [formData, setFormData] = useState<ILoginForm>({
    emailOrPhone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, login } = useAuthStore();

  const validateForm = (): boolean => {
    if (!formData.emailOrPhone.trim()) {
      toast.error("Email or phone number is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone);
    const isPhone = /^[6-9]\d{9}$/.test(formData.emailOrPhone);

    if (!isEmail && !isPhone) {
      toast.error("Enter a valid email address or 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData);
      resetForm();
      onSuccess();
    } catch (err) {
      console.error("Login Failed : ", err);
    }
  };

  const resetForm = () => {
    setFormData({ emailOrPhone: "", password: "" });
    setShowPassword(false);
  };

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoggingIn,
    validateForm,
    handleSubmit,
    resetForm,
  };
};

export default useLoginForm;
