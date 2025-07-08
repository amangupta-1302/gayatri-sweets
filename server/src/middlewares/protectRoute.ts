import jwt, { JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../models/UserModel"
import { Request , Response , NextFunction } from "express"
import { HTTP_STATUS } from "../utils/statusCodes"

export interface AuthenticatedRequest extends Request{
    user?: IUser
}

export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise <void> => {
    try {
        // const authHeader = req.headers.authorization
        // const token = authHeader && authHeader.split(" ")[1] // bearer token

        const token = req.cookies?.token

        if (!token) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Access token required" })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload
        
        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "User not found" })
            return
        }
        req.user = user
        next()
    }
    catch (err) {
        console.error("Protected middleware error ", err)
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid or expired Token" })
        return
    }
    
}