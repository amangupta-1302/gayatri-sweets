import { useState } from "react";
import { type LoginModalProps } from "../utils/interfaces";
import { ModalPopup } from "../components/ModalPopup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useAuthStore } from "../store/authStore";
import {toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC<LoginModalProps> = ({
  isOpen , onClose
}) => {

  const [formData, setFormData] = useState({
    emailOrPhone: "", 
    password :""
  })
  const [showPassword, setShowPassword] = useState(false)
  const { isLogginIn, login } = useAuthStore()
  const navigate = useNavigate()
  
  const validateForm = () => {
    if (!formData.emailOrPhone.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone)
    const isPhone = /^[6-9]\d{9}$/.test(formData.emailOrPhone)
    if (!isEmail && !isPhone) {
      toast.error("Enter a valid email or phone number")
      return
    }

    return true;
  };

  const handleSignup = async () => {
    navigate("/signup")
  }
  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    if (validateForm()) {
      await login(formData)
      setFormData({emailOrPhone: "", password: ""});
      onClose()
    }
  }

  const handleClose = () => {
    setFormData({emailOrPhone: "",password: ""}); // clear the form
    setShowPassword(false)
    onClose()
  }

  return (
    <ModalPopup
      isOpen={isOpen}
      onClose={handleClose}
      title="Log In"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* EMAIL */}
        <div className="space-y-2">
          <label htmlFor="email"
            className="text-sm font-medium text-foreground">
            Email / Phone
          </label>
          <input type="text" 
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter email or phone "
            required
            disabled={isLogginIn}
          />
        </div>
        {/* PASSWORD FIELD */}
        <div className="space-y-2">
          <label htmlFor="password"
            className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              placeholder="Enter Password"
              required
              disabled={isLogginIn}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground"
            >
              {
                showPassword ? (<EyeSlashIcon className="h-4 w-4"/>) : (
                  <EyeIcon className= "h-4 w-4"/>) 
              }
            </button>
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLogginIn}
          className="w-full bg-yellow-600 text-white font-medium py-2 px-4 rounded hover:bg-yellow-700 transition"
        >
          {isLogginIn ? "logging in..": "Log In"}
        </button>

        {/* SIGNUP */}
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            className="text-primary hover:text-primary/80 underline-offset-4 hover:underline font-medium"
              onClick={handleSignup}
          >
            Sign Up?
          </button>
        </div>
      </form>
  </ModalPopup>
  )
}

export default LoginPage;