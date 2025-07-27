import * as addressService from "../services/address";
import { create } from "zustand";
import type {
  CreateAddressPayload,
  IAddressStore,
  IUserAddress,
} from "../utils/types/user";
import { devtools } from "zustand/middleware";
import toast from "react-hot-toast";

export const useAddressStore = create<IAddressStore>()(
  devtools(
    (set, get) => ({
      //States
      addresses: [],
      isLoading: true,

      // Actions
      fetchAddresses: async () => {
        if (!get().isLoading) set({ isLoading: true });
        try {
          const addresses = await addressService.getUserAddresses();
          set({ addresses, isLoading: false });
        } catch (err) {
          console.error("Error while fetching addresses: ", err);
          toast.error("Failed to load addresses");
          set({ isLoading: false });
        }
      },

      addAddress: async (addressData: CreateAddressPayload) => {
        set({ isLoading: true });
        try {
          const newAddress = await addressService.addUserAddress(addressData);
          set((state) => ({
            addresses: [newAddress, ...state.addresses],
            isLoading: false,
          }));
          toast.success("Address added successfully");
        } catch (err) {
          console.error("Error while adding new address: ", err);
          toast.error("Failed to add new address");
          set({ isLoading: false });
        }
      },

      updateAddress: async (id: string, updates: Partial<IUserAddress>) => {
        set({ isLoading: true });
        try {
          const updatedAddress = await addressService.updateUserAddress(
            id,
            updates
          );

          set((state) => ({
            addresses: state.addresses.map((addr) =>
              addr._id === id ? updatedAddress : addr
            ),
            isLoading: false,
          }));
          toast.success("Address updated successfully");
        } catch (err) {
          console.error("Error while updating address: ", err);
          toast.error("Failed to update Address");
        }
      },

      deleteAddress: async (id: string) => {
        set({ isLoading: true });
        try {
          await addressService.deleteUserAddress(id);
          set((state) => ({
            addresses: state.addresses.filter((addr) => addr._id !== id),
            isLoading: false,
          }));
          toast.success("Address deleted successfully");
        } catch (err) {
          console.error("Error while deleting address: ", err);
          toast.error("Failed to delete address");
          set({ isLoading: false });
        }
      },
      //   getAddress: async (id: string) => {},
    }),
    { name: "AddressStore" }
  )
);
