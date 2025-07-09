import { IUser } from "../models/UserModel"
import { generateToken } from "../utils/generateToken"
import { Request, Response } from 'express'
import { HTTP_STATUS } from "../utils/statusCodes"
import { checkIfUserExists , createNewUser , validateUserCredentials} from "../services/auth"
import { AuthenticatedRequest } from "../middlewares/protectRoute"


//registerUser
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    
    /**
     * Takes request body and adds new user to the database and returns its details except password
     */
    try {
        const { name, phone, email, password } = req.body as {
            name: string,
            phone: string,
            email?: string,
            password: string
        }
        
        //todo: remove this validation and add in Frontend 
        if (!name || !phone || !password) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Name , Phone and password are required" })
            return
        }
        if (await checkIfUserExists(email , phone)) {
            res.status(HTTP_STATUS.CONFLICT).json({ message: "User already exists" })
            return
        }
        const user:IUser = await createNewUser({ name, email, phone, password })

        const token = generateToken(user._id.toString())

        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
            maxAge : 3*24*60*60*1000 // 3 days
        })
        res.status(HTTP_STATUS.CREATED).json({
            message: "User registered successfully", 
            data: {

                _id: user._id, 
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                addresses : user.addresses 
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
export const loginUser = async (req: Request, res: Response): Promise<void> => { 
    /**
     * Takes email & password or phone Number & Otp to login user
     */
    try {
        const { emailOrPhone, password } = req.body 
        
        if (!emailOrPhone || !password) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email/Phone and password are required" });
            return
        }
        const user = await validateUserCredentials(emailOrPhone, password)
        if (!user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message:"Invalid credentials"
            })
            return 
        }
        const token = generateToken(user._id.toString())
    
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
            maxAge : 3*24*60*60*1000 // 3 days
        })

        res.status(HTTP_STATUS.OK).json({
            message: "Login successful", 
            data: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                role: user.role,
                addresses: user.addresses
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

//check authenticated User
export const checkAuthUser = async (req: Request, res: Response): Promise<void> => { 
    /**
     * Returns the logged in User to check if user is authenticated/logged in 
     */
    const user = (req as AuthenticatedRequest).user
    if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid session" })
        return
    }
    res.status(HTTP_STATUS.OK).json(user)
    return
}

//logout User
export const logoutUser = (req: Request, res: Response) => {
    /**
     * logs out user 
     */
    res.clearCookie('token', {
        httpOnly: true, 
        sameSite: "strict", 
        secure: true, 
        maxAge: 0
    })

    res.status(HTTP_STATUS.OK).json({message:"Logged out successfully"})
}

//get User profile details 
export const getUserProfile = (req: Request, res: Response) => {

    /**
     * Returns all the user details having email phone , password (user can update password also )
     */
    
    // implement to show the logged in user details , his address (its management also)

    // later user can update his password also
}