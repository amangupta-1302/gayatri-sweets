import mongoose from "mongoose"
import User, { IUser } from "../models/UserModel"

export const findUserById = async (userId: mongoose.Types.ObjectId | string): Promise<IUser | null> => {
    try {
        return await User.findById(userId)
    }
    catch (err) {
        console.error("Error finding user by Id: ", err)
        return null
    }
} 