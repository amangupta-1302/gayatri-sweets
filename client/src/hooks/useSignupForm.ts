import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { type IRegisterForm } from "../utils/types/auth";
import { type IUseSignupFormReturn } from "../utils/types/hook";
import toast from "react-hot-toast";

const useSignupForm = (onSuccess: () => void): IUseSignupFormReturn => {
  const [formData, setFormData] = useState<IRegisterForm>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { isSigningUp, signup } = useAuthStore();

  const validateForm = (): boolean => {
    const { name, email, phone, password } = formData;

    if (!name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (name.trim().length < 3) {
      toast.error("Name must be atleast 3 characters");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    const isValidPhone = /^[6-9]\d{9}$/.test(phone);
    if (!isValidPhone) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }

    if (email && email.trim()) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        toast.error("Enter a valid email address");
        return false;
      }
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be atleast 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm) return;

    try {
      await signup(formData);
      resetForm();
      onSuccess();
    } catch (err) {
      console.error("Signup failed : ", err);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      password: "",
      phone: "",
    });
    setShowPassword(false);
  };

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    resetForm,
    handleSubmit,
    validateForm,
    isSigningUp,
  };
};

export default useSignupForm;
