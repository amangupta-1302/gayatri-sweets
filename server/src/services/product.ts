import Product, { IProduct } from "../models/ProductModel";


export const addNewProduct = async (data: Partial<IProduct>) :Promise<IProduct>=> {
    const product = new Product({
        ...data , isAvailable: (data.stock!>0)
    })
    return await product.save()
}

export const updateProductbyId = async (productId: string, data: Partial<IProduct>): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(productId , data ,{new:true})
}

export const deleteProductbyId = async (productId: string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(productId)
}