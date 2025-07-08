import express from "express"
import {getAllProducts , getProductbyId , addProduct , updateProduct , deleteProduct } from "../controllers/products"
import { protectRoute } from "../middlewares/protectRoute"
import { isAdmin } from "../middlewares/adminRoute"
const productRouter = express.Router()


//admin routes
productRouter.post("/admin/add", protectRoute, isAdmin, addProduct)
productRouter.put("/admin/:id", protectRoute, isAdmin, updateProduct)
productRouter.delete("/admin/:id" , protectRoute , isAdmin , deleteProduct)

//customer routes
productRouter.get("/", getAllProducts)
productRouter.get("/:id" , getProductbyId) // to get only mongodb ID

export default productRouter


