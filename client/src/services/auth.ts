import type {
  ILoginForm,
  IPasswordUpdateForm,
  IRegisterForm,
} from "../utils/types/auth";
import { axiosInstance } from "../utils/axios";
import type { IUser } from "../utils/types/user";

export const loginUser = async (formData: ILoginForm): Promise<IUser> => {
  const res = await axiosInstance.post("/auth/login", formData);
  return res.data.data;
};

export const registerUser = async (formData: IRegisterForm): Promise<IUser> => {
  const res = await axiosInstance.post("/auth/register", formData);
  return res.data.data;
};

export const logoutUser = async (): Promise<void> => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data.data;
};

export const checkUserAuth = async (): Promise<IUser> => {
  const res = await axiosInstance.get("/auth/check");
  return res.data.data;
};

export const updateUserPassword = async (
  formData: IPasswordUpdateForm
): Promise<void> => {
  const res = await axiosInstance.put("/auth/change-password", formData);

  return res.data.data;
};
