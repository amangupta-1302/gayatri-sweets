import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/statusCodes";
import { AuthenticatedRequest } from "../middlewares/protectRoute";
import { IAddress } from "../models/AddressModel";
import {fetchUserAddresses , fetchUserAddressById , deleteUserAddress , updateUserAddress , addNewUserAddress} from "../services/address"

// address controller

export const addNewAddress = async (req: Request, res: Response): Promise<void> => {
    /* Adds new address to the user and returns all addresses */
    try {
        const user = (req as AuthenticatedRequest).user
        if (!user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" })
            return
        }
        const requestedAddress: IAddress = req.body
        const addresses = await fetchUserAddresses(user._id)
        if (!addresses) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Addresses not found" })
            return
        }

        if (addresses.length >= 5) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Maximum 5 addresses are allowed" })
            return
        }
        const hasHome = addresses.some((a) => a.label === "Home")
        const hasWork = addresses.some((a) => a.label === "Work")
        const otherCount = addresses.filter((a) => a.label === "Other").length
        
        if (requestedAddress.label === "Home" && hasHome) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Home address already exists" })
            return 
        }
        if (requestedAddress.label === "Work" && hasWork) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Work address already exists" })
            return
        }
        if (requestedAddress.label === "Other") {
            if (!requestedAddress.customLabel?.trim()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Custom Label required" })
                return
            }
            if (otherCount >= 3) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Maximum 3 'Other' address are allowed" })
                return
            }
            const duplicateOther = addresses.some((a) => a.label === "Other" && a.customLabel === requestedAddress.customLabel)
            if (duplicateOther) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Custom Label already exists" })
                return
            }
        }
        const updatedAddress = await addNewUserAddress(user._id, requestedAddress)
        res.status(HTTP_STATUS.CREATED).json({message:"Address added" , addresses : updatedAddress})
        return
    }
    catch (err) {
        console.error("Error while adding new address: ", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Failed to add new address"})
    }  
}

export const getAllAddress = async (req: Request, res: Response): Promise<void> => {
    /**
     Get all user addreseses saved to db 
     */

    const user = (req as AuthenticatedRequest).user
    if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
    }

    const addressArray = await fetchUserAddresses(user._id)
    if (!addressArray) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Address not found , add new" });
        return; // todo: need to check return req or not
    }

    res.status(HTTP_STATUS.OK).json({ addressArray })
    return
}

export const getAddressById = async (req: Request, res: Response): Promise<void> => {

    /**
    Returns a particular address associated with a specific user
     */
    try {
        const user = (req as AuthenticatedRequest).user
        if (!user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
            return;
        }

        const address = await fetchUserAddressById(user._id, req.params.id)
        if (!address) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Address not found" });
            return;
        }
        res.status(HTTP_STATUS.OK).json({ address })
        return
    }
    catch (err) {
        console.error("Error while fetching address by ID: ", err)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch address" })
        return
    }
}

export const updateAddress = async (req: Request, res: Response): Promise<void> => { 

    /**
     Updates user address by taking its addressId 
     */
    const user = (req as AuthenticatedRequest).user
    if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
    }

    const updatedFields = req.body
    const result = await updateUserAddress(user._id, req.params.id, updatedFields)
    
    if (!result) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Address not found or update failed" });
        return;
    }
    res.status(HTTP_STATUS.OK).json({ message: "Address updated", updatedaddress: result })
    return
}

export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
    /**
     * Deletes user's specific address by addressId
     */
    const user = (req as AuthenticatedRequest).user
    if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        return
    }   
    const result = await deleteUserAddress(user._id, req.params.id)
    if (!result) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Address not found or delete failed" });
        return;
    }
    res.status(HTTP_STATUS.OK).json({ message: "Address deleted" })
    return
    
}