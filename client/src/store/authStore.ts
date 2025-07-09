import { create } from "zustand"
import { type IUseAuthStore, type ILoginForm, type IResgisterForm } from "../utils/interfaces"
import { axiosInstance } from "../utils/axios"
import { toast } from "react-hot-toast"

export const useAuthStore = create<IUseAuthStore>((set) => ({
    authUser: null, 
    isSigninUp: false,
    isLogginIn: false, 
    isCheckingAuth: true,

    checkAuthUser: async () => {
        try {       
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
        }
        catch (err) {
            console.error("Auth user check failed : ", err)
            set({authUser: null})
        }
        finally {
            set({isCheckingAuth:false})
        }
    },

    login: async (formData : ILoginForm) => {
        set({ isLogginIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", formData)
            set({ authUser: res.data })
            toast.success("Login Successfull!")
        }
        catch (err) {
            console.error("Error while login : ", err)
            toast.error("Invalid!, Please try again")
        }
    },

    signup: async (formData :IResgisterForm) => {
        set({ isSigninUp: true })
        try {
            const res = await axiosInstance.post("/auth/register", formData)
            set({ authUser: res.data })
            toast.success("Account created successfully")
        }
        catch (err) {
            console.error("Error while signup : ", err)
            toast.error("Something went wrong!")
        }
        finally {
            set({isSigninUp:false})
        }
    }, 

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logged out successfully!")
        }
        catch (err) {
            console.error("Error while logging out : ", err)
            toast.error("Please try again!")
        }
    }
}))