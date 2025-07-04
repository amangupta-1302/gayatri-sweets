import mongoose, { Schema, Document } from "mongoose";


export interface IProduct extends Document{
    name: string, 
    description: string, 
    price: number, 
    imageUrl?: string,  // todo: make this not nullable 
    stock: number, 
    isAvailable : boolean
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true }, 
    description: { type: String }, 
    price: { type: Number, required: true }, 
    imageUrl: { type: String, required: true }, 
    stock: { type: Number, default: 0 },
    isAvailable: {type: Boolean , default:true}
},
    { timestamps: true }
)


const Product = mongoose.model<IProduct>("Product", productSchema)
export default Product