import { create } from "zustand";
import {
  type IUseAuthStore,
  type ILoginForm,
  type IRegisterForm,
  type IPasswordUpdateForm,
} from "../utils/types/auth";
import { axiosInstance } from "../utils/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create<IUseAuthStore>((set) => ({
  //States
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingPassword: false,

  //Actions
  checkAuthUser: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (err) {
      console.error("Auth check failed : ", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (formData: ILoginForm) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data.data });
      toast.success("Login Successfull!");
    } catch (err) {
      console.error("Error while login : ", err);
      toast.error("Invalid!, Please try again");
      throw err;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (formData: IRegisterForm) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      set({ authUser: res.data.data });
      toast.success("Account created successfully");
    } catch (err) {
      console.error("Error while signup : ", err);
      toast.error("Something went wrong!");
      throw err;
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Error while logging out : ", err);
      toast.error("Please try again!");
      throw err;
    }
  },

  updatePassword: async (formData: IPasswordUpdateForm) => {
    set({ isUpdatingPassword: true });
    try {
      await axiosInstance.put("/auth/change-password", formData);
      toast.success("Password updated successfully");
    } catch (err) {
      console.error("Error while updating password: ", err);
      toast.error("Failed to update password");
      throw err;
    } finally {
      set({ isUpdatingPassword: false });
    }
  },
}));
