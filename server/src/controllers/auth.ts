import User, { IUser } from "../models/UserModel"
import { generateToken } from "../utils/generateToken"
import bcrypt from "bcryptjs"
import { Request, Response } from 'express'
import { HTTP_STATUS } from "../utils/statusCodes"

interface AuthenticatedRequest extends Request{
    user?: IUser
}

//registerUser
export const registerUser = async (req: Request, res: Response):Promise<void> => {
    try {
        const { name, phone, email, password } = req.body as {
            name: string,
            phone: string,
            email?: string,
            password: string
        }
        
        //improve: remove this validation and add in Frontend 
        if (!name || !phone || !password) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Name , Phone and password are required" })
            return
        }

        const userExists = await User.findOne({ $or: [{ email }, { phone }] })
        if (userExists) {
            res.status(HTTP_STATUS.CONFLICT).json({ message: "User already exists" })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser: IUser = await User.create({
            name, email, phone, password: hashedPassword
        })

        const token = generateToken(newUser._id.toString())
        const userResponse = {
            _id: newUser._id, 
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            addresses : newUser.addresses
        }

        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
            maxAge : 3*24*60*60*1000 // 3 days
        })
        res.status(HTTP_STATUS.CREATED).json({
            message: "User registered successfully", 
            data: {
                user: userResponse,  // can add token if given in headers
            }
        })
        return
    }
    catch (err) {
        console.error("Registration error: " ,err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Server error" })
        return
    }
}

//loginUser
export const loginUser = async (req: Request, res: Response) :Promise<void> => { 
    try {
        const { emailOrPhone, password } = req.body 
        
        const user = await User.findOne({
            $or: [{phone : emailOrPhone}, {email:emailOrPhone}]
        })

        if (!user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message:"Invalid credentials"
            })
            return 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if (!isPasswordValid) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message:"Invalid credentials"
            })
            return 
        }

        const token = generateToken(user._id.toString())

        const userResponse = {
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            role: user.role,
            addresses: user.addresses
        }
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
            maxAge : 3*24*60*60*1000 // 3 days
        })
        res.status(HTTP_STATUS.OK).json({
            message: "Login successful", 
            data: {
                user:userResponse
            }
        })
        return
    }
    catch (err) {
        console.error("Login error : ", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message:"Internal server error"
        })
        return
    }
}

//getUserProfile
export const getUserProfile = async (req:Request, res: Response):Promise<void>  => { 
    const user = (req as AuthenticatedRequest).user
    if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid session" })
        return
    }
    res.status(HTTP_STATUS.OK).json(user)
    return
}


export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true, 
        sameSite: "strict", 
        secure: true, 
        maxAge: 0
    })

    res.status(HTTP_STATUS.OK).json({message:"Logged out successfully"})
}