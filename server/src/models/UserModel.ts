import mongoose, { Document , Schema, Types } from "mongoose";

interface Address {
    label: string,
    addressLine: string, 
    city: string, 
    state: string, 
    pincode: string,
    phone : string 
}

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
    label: {type: String, default:"Home"},
    addressLine: { type: String, required: true }, 
    city: { type: String, required: true }, 
    pincode: { type: String, required: true }, 
    state: { type: String, required: true }, 
    phone :{ type: String, required: true }, 
}, 
    { _id: false } // to not create sub ids 
) 

const userSchema = new Schema<IUser>({
    name: { type: String, required: true }, 
    phone: { type: String, required: true, unique: true }, 
    email: { type: String, sparse: true, unique: true },  //optional but unique 
    password: { type: String, required: true },
    addresses: {
        type: [addressSchema],
        validate: [arrayLimit, "{PATH} exceeds limit of 5"], 
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

//limit address to 5 
function arrayLimit(val: Address[]) {
    return val.length<=5
}

const User = mongoose.model<IUser>('User', userSchema)
export default User