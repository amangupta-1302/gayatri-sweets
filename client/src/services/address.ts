import { axiosInstance } from "../utils/axios";
import type { IUserAddress, CreateAddressPayload } from "../utils/types/user";

export const getUserAddresses = async (): Promise<IUserAddress[]> => {
  const { data } = await axiosInstance.get("/auth/address/");

  return data.data.addresses;
};

export const addUserAddress = async (
  address: CreateAddressPayload
): Promise<IUserAddress> => {
  const { data } = await axiosInstance.post("/auth/address/add", address);
  const addresses = data.data?.addresses || [];
  return addresses[addresses.length - 1]; // return the latest address
};

export const deleteUserAddress = async (id: string): Promise<void> => {
  const res = await axiosInstance.delete(`/auth/address/${id}`);
  return res.data;
};

export const getAddressById = async (id: string): Promise<IUserAddress> => {
  const { data } = await axiosInstance.get(`/auth/address/${id}`);
  return data.address;
};

export const updateUserAddress = async (
  id: string,
  updates: Partial<IUserAddress>
): Promise<IUserAddress> => {
  const { data } = await axiosInstance.put(
    `/auth/address/update/${id}`,
    updates
  );
  return data;
};
