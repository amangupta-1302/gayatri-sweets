import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "react-hot-toast";
import * as authService from "../services/auth";
import type {
  ILoginForm,
  IAuthStore,
  IRegisterForm,
  IPasswordUpdateForm,
} from "../utils/types/auth";

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set) => ({
        //States
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isCheckingAuth: false,
        isUpdatingPassword: false,

        // Actions

        login: async (formData: ILoginForm) => {
          set({ isLoggingIn: true });
          try {
            const res = await authService.loginUser(formData);
            set({ authUser: res, isLoggingIn: false });
            toast.success("Login Successfull!");
          } catch (err) {
            console.error("Error while login : ", err);
            toast.error("Invalid!, Please try again");
            set({ isLoggingIn: false });
            throw err;
          }
        },

        signup: async (formData: IRegisterForm) => {
          set({ isSigningUp: true });
          try {
            const res = await authService.registerUser(formData);
            set({ authUser: res, isSigningUp: false });
            toast.success("Account created successfully");
          } catch (err) {
            console.error("Error while signup : ", err);
            toast.error("Something went wrong!");
            set({ isSigningUp: false });
          }
        },

        logout: async () => {
          try {
            await authService.logoutUser();
            set({ authUser: null });
            toast.success("Logged out successfully!");
          } catch (err) {
            console.error("Error while logging out : ", err);
            set({ authUser: null });
            toast.success("Logged out successfully!");
          }
        },

        updatePassword: async (formData: IPasswordUpdateForm) => {
          set({ isUpdatingPassword: true });
          try {
            await authService.updateUserPassword(formData);
            toast.success("Password updated successfully");
            set({ isUpdatingPassword: false });
          } catch (err) {
            console.error("Error while updating password: ", err);
            toast.error("Failed to update password");
            set({ isUpdatingPassword: false });
          }
        },

        checkAuthUser: async () => {
          set({ isCheckingAuth: true });
          try {
            const res = await authService.checkUserAuth();
            set({ authUser: res, isCheckingAuth: false });
          } catch (err) {
            console.error("Auth check failed: ", err);
            set({ authUser: null, isCheckingAuth: false });
          }
        },
      }),
      {
        name: "gayatri-sweets-auth", // local storage key name
        partialize: (state) => ({
          authUser: state.authUser,
        }),
      }
    ),
    { name: "AuthStore" }
  )
);
