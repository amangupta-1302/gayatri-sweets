import mongoose, { Document , Schema, Types } from "mongoose";

//address interface for user addresses
interface Address {
    label: string,
    addressLine: string, 
    city: string, 
    state: string, 
    pincode: string,
    phone: string, 
    isDefault?: boolean
}

//User interface
export interface IUser extends Document{
    _id : Types.ObjectId,
    name: string, 
    phone: string, 
    email?: string, 
    password: string, 
    addresses: Address[], 
    role: 'customer'| 'admin'
}


const addressSchema = new Schema<Address>({
    label: {
        type: String, default: "Home",
    },
    addressLine: {
        type: String, required: true, 
    }, 
    city: {
        type: String, required: true, 
    }, 
    pincode: {
        type: String, required: true, 
    }, 
    state: {
        type: String, required: true,
    }, 
    phone: {
        type: String, required: true, 
    }, 
    isDefault: {
        type:Boolean, 
        default: false
    }
}, 
    { _id: false } // to not create sub ids 
) 

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
export {Address}