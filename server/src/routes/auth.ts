import express from "express"
import {loginUser , registerUser , getUserProfile , logoutUser}  from "../controllers/auth"
import { protectRoute } from "../middlewares/protectRoute"
import addressRouter from "./address"

const authRouter = express.Router()

authRouter.post("/login", loginUser)
authRouter.post("/register", registerUser)
authRouter.get("/profile", protectRoute, getUserProfile) 
authRouter.post("/logout", logoutUser)

authRouter.use("/address" , addressRouter)


export default authRouter



