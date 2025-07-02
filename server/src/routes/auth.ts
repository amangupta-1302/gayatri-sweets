import express from "express"
import {loginUser , registerUser , getUserProfile}  from "../controllers/auth"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/profile" , getUserProfile) // todo: protect route

export default router


