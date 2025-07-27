import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/statusCodes";
import { AuthenticatedRequest } from "../middlewares/protectRoute";
import { IAddress } from "../models/AddressModel";
import {
  fetchUserAddresses,
  fetchUserAddressById,
  deleteUserAddress,
  updateUserAddress,
  addNewUserAddress,
} from "../services/address";

/**
 * @desc Add new address to user
 * @route POST auth/address/add
 * @access private
 */
export const addNewAddress = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized" });
      return;
    }
    const requestedAddress: IAddress = req.body;
    const addresses = (await fetchUserAddresses(user._id)) || [];

    if (addresses.length >= 5) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: "Maximum 5 addresses are allowed" });
      return;
    }
    const hasHome = addresses.some((a) => a.label === "Home");
    const hasWork = addresses.some((a) => a.label === "Work");
    const otherCount = addresses.filter((a) => a.label === "Other").length;

    if (requestedAddress.label === "Home" && hasHome) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: "Home address already exists" });
      return;
    }
    if (requestedAddress.label === "Work" && hasWork) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: "Work address already exists" });
      return;
    }
    if (requestedAddress.label === "Other") {
      if (!requestedAddress.customLabel?.trim()) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, message: "Custom Label required" });
        return;
      }
      if (otherCount >= 3) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Maximum 3 'Other' address are allowed",
        });
        return;
      }
      const duplicateOther = addresses.some(
        (a) =>
          a.label === "Other" && a.customLabel === requestedAddress.customLabel
      );
      if (duplicateOther) {
        res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ success: false, message: "Custom Label already exists" });
        return;
      }
    }
    const updatedAddress = await addNewUserAddress(user._id, requestedAddress);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Address added successfully",
      success: true,
      date: {
        addresses: updatedAddress,
      },
    });
  } catch (err) {
    console.error("Error while adding new address: ", err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to add new address" });
  }
};

/**
 * @route GET /auth/address
 * @desc Retrieve all addresses for the authenticated user
 * @access private
 */
export const getAllAddress = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized" });
      return;
    }

    const addresses = await fetchUserAddresses(user._id);
    if (!addresses) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "No addresses found, please add a new one",
      });
      return; // todo: need to check return req or not
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Addresses retrieved successfully",
      data: { addresses },
    });
  } catch (err) {
    console.error("Error while fetching addresses: ", err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch addresses" });
  }
};

/**
 * @route GET auth/address/:id
 * @desc Retrieve a specific address by its Id for the authenticated user
 * @access private
 */
export const getAddressById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized" });
      return;
    }

    const address = await fetchUserAddressById(user._id, req.params.id);
    if (!address) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ success: false, message: "Address not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Address retrieved successfully",
      data: { address },
    });
  } catch (err) {
    console.error("Error while fetching address by ID: ", err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch address" });
    return;
  }
};

/**
 * @route PUT /auth/address/:id
 * @desc update an existing address by its Id for the authenticated user
 * @access private
 */
export const updateAddress = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized" });
      return;
    }

    const updatedFields: Partial<IAddress> = req.body;
    const result = await updateUserAddress(
      user._id,
      req.params.id,
      updatedFields
    );

    if (!result) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Address not found or update failed",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      success: false,
      message: "Address updated",
      data: { result },
    });
    return;
  } catch (err) {
    console.error("Error while updating address: ", err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update address",
    });
  }
};

/**
 * @route DELETE /auth/address/:id
 * @desc Delete a specific address by its ID for the authenticated user
 * @access private
 */
export const deleteAddress = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized" });
      return;
    }
    const result = await deleteUserAddress(user._id, req.params.id);
    if (!result) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Address not found or delete failed",
      });
      return;
    }
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (err) {
    console.error("Error while deleting address: ", err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete address",
    });
  }
};
