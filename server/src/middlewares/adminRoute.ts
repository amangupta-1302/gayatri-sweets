import { NextFunction, Request , Response } from "express";
import { HTTP_STATUS } from "../utils/statusCodes";
import { IUser } from "../models/UserModel";


interface AuthenticatedRequest extends Request{
    user?: IUser
}

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction)=> {
    try {
        if (req.user?.role !== 'admin') {
            res.status(HTTP_STATUS.FORBIDDEN).json({message:"Access denied : Admin only "})
            return
        }
        next()
    }
    catch (err) {
        console.error("isAdmin Error:", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Something went wrong while checking admin access"})
    }
}