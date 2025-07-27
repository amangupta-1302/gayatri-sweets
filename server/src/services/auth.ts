import mongoose from "mongoose";
import User, { IUser } from "../models/UserModel";
import bcrypt from "bcryptjs";

export const checkIfUserExists = async (email?: string, phone?: string) => {
  return await User.findOne({ $or: [{ email }, { phone }] });
};

export const createNewUser = async ({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email?: string;
  phone: string;
  password: string;
}): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  return user;
};

export const validateUserCredentials = async (
  emailOrPhone: string,
  password: string
): Promise<IUser | null> => {
  const user = await User.findOne({
    $or: [{ phone: emailOrPhone }, { email: emailOrPhone }],
  });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};

export const updateUserPassword = async (
  userId: mongoose.Types.ObjectId,
  newPassword: string
): Promise<void> => {
  try {
    //Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    //update user's password
    await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
        updatedAt: new Date(),
      },
      { new: true }
    );
  } catch (err) {
    console.error("Error updating user password: ", err);
  }
};
