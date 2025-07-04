import express from "express"
import {getAllProducts , getProductbyId , addProduct , updateProduct , deleteProduct } from "../controllers/products"
import { protectRoute } from "../middlewares/protectRoute"
import { isAdmin } from "../middlewares/adminRoute"
const router = express.Router()


//admin routes
router.post("/add", protectRoute, isAdmin, addProduct)
router.put("/:id", protectRoute, isAdmin, updateProduct)
router.delete("/:id" , protectRoute , isAdmin , deleteProduct)

//customer routes
router.get("/", getAllProducts)
router.get("/:id" , getProductbyId)

export default router


