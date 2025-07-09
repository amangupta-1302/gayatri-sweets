import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProfilePage from "./pages/ProfilePage"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"

export function App() {
  const { checkAuthUser , authUser , isCheckingAuth} = useAuthStore()
  
  useEffect(() => {
    checkAuthUser()
  }, [checkAuthUser])

  if (!authUser && isCheckingAuth) { 
    return <h2>Checking Authenticated user...</h2> // todo: add skeleton or loader 
    
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          !authUser ?<LoginPage /> : <Navigate to= "/profile"/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster/>
    </>
    
  )
}

