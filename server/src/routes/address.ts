import express from "express";
import {
  addNewAddress,
  getAllAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/address";
import { protectRoute } from "../middlewares/protectRoute";

const addressRouter = express.Router();

addressRouter.use(protectRoute);

addressRouter.get("/", getAllAddress);
addressRouter.get("/:id", getAddressById);
addressRouter.put("/update/:id", updateAddress);
addressRouter.post("/add", addNewAddress);
addressRouter.delete("/:id", deleteAddress);

export default addressRouter;
