import User, { IUser } from "../models/UserModel";
import bcrypt from "bcryptjs"

export const checkIfUserExists = async (email?: string, phone?: string) => {
    return await User.findOne({$or:[{email} , {phone}]})
}


export const createNewUser = async ({name, email, phone, password}: {
    name: string, email?: string, phone: string, password: string
}): Promise<IUser> => {
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await User.create({
        name , email , phone , password:hashedPassword
    })
    return user
}


export const validateUserCredentials = async (emailOrPhone: string, password: string): Promise<IUser | null> => {
    
    const user = await User.findOne({
        $or: [{ phone: emailOrPhone }, { email: emailOrPhone }],
    })
    if (!user) return null
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return null
    
    return user
}