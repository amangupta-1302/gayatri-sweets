import express from "express"
import {loginUser , registerUser , getUserProfile , logoutUser}  from "../controllers/auth"
import { protectRoute } from "../middlewares/protectRoute"


const authRouter = express.Router()

authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)
authRouter.get("/profile", protectRoute, getUserProfile) 
authRouter.get("/logout" , logoutUser)


export default authRouter


