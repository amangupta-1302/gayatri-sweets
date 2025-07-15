import { Route, Routes ,useNavigate } from "react-router-dom"
import HomePage from "../pages/HomePage"
import SignupPage from "../pages/SignupPage"
import ProfilePage from "../pages/ProfilePage"
import LoginPage from "../pages/LoginPage"

const AppRoutes = () => {
    const navigate = useNavigate()

    return (
        <Routes>
            <Route path="/login" element={<LoginPage
                isOpen={true}
                onClose = {()=> navigate("/")}
            />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path = "/profile" element={<ProfilePage/>}/>
        </Routes>
    )
}

export default AppRoutes;