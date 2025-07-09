import { Request, Response } from "express"
import { HTTP_STATUS } from "../utils/statusCodes"
import { addNewProduct  ,updateProductbyId ,deleteProductbyId , fetchAllProducts , fetchProductById} from "../services/product"

// #region admin routes

//add new product 
export const addProduct = async (req: Request, res: Response): Promise<void> => {
    /**
     * Admin only can access and add new product also 
     */
    try {
        const { name, description, price, imageUrl, stock } = req.body

        const product = await addNewProduct({
            name, description, price, imageUrl, stock
        })

        res.status(HTTP_STATUS.CREATED).json({ message: "Product added", product })
        return
    }
    catch (err) {
        console.error("Error while adding product ", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to add product", error: err })
        return
    }
}

//edit Product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    /**
     * Admin only can access and edit product details 
     */
    try {
        const { name, description, price, imageUrl, stock, isAvailable } = req.body

        const updated = await updateProductbyId(
            req.params.id, {
                name , description , price , imageUrl , stock , isAvailable
            }
        )

        if (!updated) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" })
            return
        }

        res.status(HTTP_STATUS.OK).json({ message: "Product updated", product: updated })
        return
    }
    catch (err) {
        console.error("Error while updating product :", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to update product", error: err })
        return
        
    }
}

// delete product 
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    /**
     * Admin only can access and delete any specific product 
     */
    try {
        const deleted = await deleteProductbyId(req.params.id)
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

//#endregion

//#region customer routes

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    /**
     * Gets all the products listed in Database
     */
    try {
        const products = await fetchAllProducts()
        res.status(HTTP_STATUS.OK).json({
            message: "Products fetched successfully", 
            products
        })
        return
    }
    catch (err) {
        console.error("Error fetching Products: ", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch products" })
        return
    }
}

export const getProductbyId = async (req: Request, res: Response): Promise<void> => {
    /**
     * Returns specific product by its Id
     */
    try {
        const product = await fetchProductById(req.params.id)

        if (!product) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Product not found" })
            return
        }
    }
    catch (err) {
        console.error("Error while fetching product by Id : ",err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Failed to fetch product"})
    }
}
//#endregion

