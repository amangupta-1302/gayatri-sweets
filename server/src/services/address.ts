import {IAddress } from "../models/AddressModel";
import mongoose from "mongoose";
import {findUserById} from "../utils/helper"

export const fetchUserAddresses = async (userId: mongoose.Types.ObjectId | string): Promise<IAddress[] | null> => {
    try {
        const user = await findUserById(userId)
        return user?.addresses || null
    }
    catch (err) {
        console.error("Error while fetching user addresses : ", err)
        return null
    }
}

export const fetchUserAddressById = async (userId: mongoose.Types.ObjectId | string, addressId: mongoose.Types.ObjectId | string): Promise<IAddress | null> => {
    
    try {
        const user = await findUserById(userId)
        
        if(!user) return null

        const address = user.addresses.id(addressId)
        return address || null
    }
    catch (err) {
        console.error("Error while fetching user address by Id : ", err)
        return null
    }
}

export const addNewUserAddress = async (userId: mongoose.Types.ObjectId | string, address: IAddress): Promise<IAddress[] | null> => { 
    try {
        const user = await findUserById(userId)
        if (!user) return null
        
        user.addresses.push(address)
        await user.save()

        return user.addresses
    }
    catch (err) {
        console.error("Error while adding new address : ", err)
        return null
    }    
    
}


export const updateUserAddress = async (userId: mongoose.Types.ObjectId | string, addressId: mongoose.Types.ObjectId | string, updatedFields: Partial<IAddress>): Promise<IAddress[] | null> => {
    try {
        const user = await findUserById(userId)
        if (!user) return null
        
        const address = user.addresses.id(addressId)
        if (!address) return null
        
        Object.assign(address, updatedFields)
        await user.save()

        return user.addresses
    }
    catch (err) {
        console.error("Error while updating address : ", err)
        return null
    }
}


export const deleteUserAddress = async (userId: mongoose.Types.ObjectId | string, addressId: mongoose.Types.ObjectId | string): Promise<IAddress[] | null> => {
    try {
        const user = await findUserById(userId)
        if (!user) return null
        
        user.addresses.pull({ _id: addressId })
        await user.save()

        return user.addresses
    }
    catch (err) {
        console.error("Error while deleting address : ", err)
        return null
    }
}