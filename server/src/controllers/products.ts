import { Request, Response } from "express"
import Product from "../models/ProductModel"
import { HTTP_STATUS } from "../utils/statusCodes"

// admin routes

//add new product 
export const addProduct = async (req: Request, res: Response) :Promise <void>=> {
    try {
        const { name, description, price, imageUrl, stock } = req.body

        const product = new Product({
            name , description ,price ,imageUrl , stock , isAvailable : stock>0
        })

        await product.save()

        res.status(HTTP_STATUS.CREATED).json({ message: "Product added", product })
        return
    }
    catch (err) {
        console.error("Error while adding product ", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to add product", error: err })
        return
    }
}

//update Product
export const updateProduct = async (req: Request, res: Response):Promise <void> => {
    try {
        const { name, description, price, imageUrl, stock, isAvailable } = req.body
        
        const updated = await Product.findByIdAndUpdate(
            req.params.id, {
                name , description , price , imageUrl , stock , isAvailable
            }, {new:true}
        )

        if (!updated) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" })
            return
        }

        res.status(HTTP_STATUS.OK).json({ message: "Product updated", product: updated });
    }
    catch (err) {
        console.error("Error while updating product :", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to update product", error: err })
        return
        
    }
}

// delete product 
export const deleteProduct = async (req: Request, res: Response):Promise <void> => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)

        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" })
            return
        }

        res.status(HTTP_STATUS.OK).json({ message: "Product deleted" })
        return
    }
    catch (err) {
        console.error("Error while deleting product :")
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to delete product" })
        return
    }
}

// customer routes

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    
}

export const getProductbyId = async (req: Request, res: Response): Promise<void> => {
    
}