import Product, { IProduct } from "../models/ProductModel";
import mongoose from "mongoose";

export const addNewProduct = async (data: Partial<IProduct>) :Promise<IProduct>=> {
    const product = new Product({
        ...data , isAvailable: (data.stock!>0)
    })
    return await product.save()
}

export const updateProductById = async (productId:mongoose.Types.ObjectId | string, data: Partial<IProduct>): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(productId , data ,{new:true})
}

export const deleteProductById = async (productId:mongoose.Types.ObjectId | string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(productId)
}


export const fetchAllProducts = async (): Promise<IProduct[]> => {
    return await Product.find().sort({createAt:-1}) // to get latest product first
}

export const fetchProductById = async (productId: mongoose.Types.ObjectId | string): Promise<IProduct | null> => {
    
    return await Product.findById(productId)
}