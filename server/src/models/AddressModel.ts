import { Schema } from "mongoose"

export type  AddressLabel = "Home" | "Work" | "Other"

//address interface for user addresses
export interface IAddress {
    fullname: string, 
    landmark?:string,
    addressLine: string, 
    city: string, 
    state: string, 
    pincode: string,
    phone: string, 
    isDefault?: boolean,
    customLabel?: string,
    label:AddressLabel
}

export const addressSchema = new Schema < IAddress >( {
    fullname: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    pincode: { type: String, required: true }, 
    city: { type: String, required: true }, 
    state: { type: String, required: true }, 
    addressLine: { type: String, required: true }, 
    landmark: { type: String },
    label: {
        type: String, 
        enum: ["Home", "Work", "Other"], 
        required:true
    }, 
    customLabel: { type: String }, 
    isDefault:{type:Boolean , default:false}
},
    { _id: true }
)
