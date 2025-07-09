import mongoose, { Document , Schema, Types } from "mongoose";
import { addressSchema, IAddress } from "./AddressModel";

//User interface
export interface IUser extends Document{
    _id : mongoose.Types.ObjectId,
    name: string, 
    phone: string, 
    email?: string, 
    password: string, 
    addresses: mongoose.Types.DocumentArray<IAddress>, 
    role: 'customer'| 'admin'
}

//User schema definition
const userSchema = new Schema<IUser>({
    name: {
        type: String, required: true
    }, 
    phone: { type: String, required: true, unique: true }, 
    email: { type: String, sparse: true, unique: true },  //optional but unique 
    password: { type: String, required: true },
    addresses: {
        type: [addressSchema],
        default :[]
    }, 
    role: {
        type: String, 
        enum: ["customer", "admin"],
        default : "customer"
    }
    //todo: add otp field
},
    {timestamps : true}
)

const User = mongoose.model<IUser>('User', userSchema)
export default User