import { Request, Response } from "express";
import { IUser } from "../models/UserModel";
import { generateToken } from "../utils/generateToken";
import { HTTP_STATUS } from "../utils/statusCodes";
import {
  checkIfUserExists,
  createNewUser,
  validateUserCredentials,
  updateUserPassword,
} from "../services/auth";
import { AuthenticatedRequest } from "../middlewares/protectRoute";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  maxAge: 3 * 24 * 60 * 1000, // 3 days
};

const USER_RESPONSE = (user: IUser) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  addresses: user.addresses,
});

/**
 * @desc Register a new user
 * @route POST auth/registered
 * @access public
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, phone, email, password } = req.body as {
      name: string;
      phone: string;
      email?: string;
      password: string;
    };
    if (!name || !phone || !password) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Name , phone and password are required",
      });
      return;
    }

    // check if user already exists
    if (await checkIfUserExists(email, phone)) {
      res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: "User with this email or phone already exists",
      });
      return;
    }

    // Create new User
    const user: IUser = await createNewUser({ name, email, phone, password });

    // generate token and set cookie
    const token = generateToken(user._id.toString());

    res.cookie("token", token, COOKIE_OPTIONS);

    // Send Success response
    res.status(HTTP_STATUS.CREATED).json({
      message: "User registered successfully",
      success: true,
      data: USER_RESPONSE(user),
    });
  } catch (err) {
    console.error("Registration error: ", err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error", success: false });
  }
};

/**
 * @desc Authenticate user login
 * @route POST /auth/login
 * @access public
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { emailOrPhone, password } = req.body;

    //input validation
    if (!emailOrPhone || !password) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Email/Phone and password are required",
      });
      return;
    }

    // validate user credentials
    const user = await validateUserCredentials(emailOrPhone, password);
    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email/phone or password",
      });
      return;
    }

    // generate token and set cookie
    const token = generateToken(user._id.toString());

    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful",
      data: USER_RESPONSE(user),
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error during login",
      success: false,
    });
  }
};

/**
 * @desc Check if user is authenticated
 * @route GET auth/check
 * @access public
 */
export const checkAuthUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const user = req.user;

  if (!user) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ success: false, message: "Invalid session - user not found" });
    return;
  }
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "User authenticated",
    data: USER_RESPONSE(user),
  });
};

/**
 *
 * @desc Logout User
 * @route auth/logout
 * @access private
 */
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 0,
  });

  res
    .status(HTTP_STATUS.OK)
    .json({ success: true, message: "Logged out successfully" });
};
/**
 * @desc Get user profile details
 * @route GET auth/profile
 * @access private
 */
export const getUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Profile retrieved successfully",
      data: {
        ...USER_RESPONSE(user),
        // createdAt: user.createdAt,
        // updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error("Get profile error: ", err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving user profile",
    });
  }
};

/**
 * @desc Change user password
 * @route PUT auth/change-password
 * @access private
 */
export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body as {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    };

    const user = req.user;

    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }
    //input validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message:
          "Current password , new password and confirm password are required",
      });
      return;
    }
    //check newPassword ==== currentPassword
    if (currentPassword === newPassword) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "New password and confirm password do not match",
      });
      return;
    }

    await updateUserPassword(user._id, newPassword);
    console.log(
      `Password changed for user: ${
        user.email || user.phone
      } at ${new Date().toISOString()}`
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("Change password error: ", err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error changing password",
    });
  }
};
