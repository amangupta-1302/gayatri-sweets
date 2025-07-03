import jwt, { JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../models/UserModel"
import { Request , Response , NextFunction } from "express"

interface AuthenticatedRequest extends Request{
    user?: IUser
}


export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise <void> => {
    try {
        // const authHeader = req.headers.authorization
        // const token = authHeader && authHeader.split(" ")[1] // bearer token

        const token = req.cookies?.token

        if (!token) {
            res.status(401).json({ message: "Access token required" })
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload
        
        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            res.status(401).json({ message: "User not found" })
            return
        }
        req.user = user
        next()
    }
    catch (err) {
        console.error("Protected middleware error ", err)
        res.status(403).json({ message: "Invalid or expired Token" })
        return
    }
    
}