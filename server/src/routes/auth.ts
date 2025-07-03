import express from "express"
import {loginUser , registerUser , getUserProfile , logoutUser}  from "../controllers/auth"
import { protectRoute } from "../middlewares/protectRoute"


const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/profile", protectRoute, getUserProfile) 
router.get("/logout" , logoutUser)


export default router


