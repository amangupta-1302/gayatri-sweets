import User, { IUser } from "../models/UserModel"
import { generateToken } from "../utils/generateToken"
import bcrypt from "bcryptjs"
import { Request, Response } from 'express'


//registerUser
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, email, password } = req.body as {
            name: string,
            phone: string,
            email?: string,
            password: string
        }

        if (!name || !phone || !password) {
            res.status(400).json({ message: "Name , Phone and password are required" })
            return
        }

        const userExists = await User.findOne({ $or: [{ email }, { phone }] })
        if (userExists) {
            res.status(409).json({ message: "User already exists" })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser: IUser = await User.create({
            name, email, phone, password: hashedPassword, role: "customer"
        })

        const token = generateToken(newUser._id.toString())
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            token // to header 
        }
        )
    }
    catch (err:any) {
        res.status(500).json({message:"Server error" , error: err.message } )
    }
}

//loginUser

export const loginUser = async (req: Request, res: Response): Promise<void> => { 
    
}

//getUserProfile

export const getUserProfile = async (req: Request, res: Response): Promise<void> => { }