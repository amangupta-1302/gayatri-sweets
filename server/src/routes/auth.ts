import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  checkAuthUser,
  getUserProfile,
  changePassword,
} from "../controllers/auth";
import { protectRoute } from "../middlewares/protectRoute";
import addressRouter from "./address";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/check", protectRoute, checkAuthUser);
authRouter.get("/profile", protectRoute, getUserProfile);
authRouter.put("/change-password", protectRoute, changePassword);
authRouter.use("/address", addressRouter);

export default authRouter;
