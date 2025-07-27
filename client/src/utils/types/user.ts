//User interface
export interface IUser {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  password: string;
  role: "admin" | "customer";
  addresses?: [];
}

// user addresses
export interface IUserAddress {
  _id: string;
  fullname: string;
  landmark?: string;
  city: string;
  addressLine: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
  customLabel?: string;
  label: "Home" | "Work" | "Other";
}

export type CreateAddressPayload = Omit<IUserAddress, "_id" | "isDefault">;

export interface IAddressStore {
  //state
  addresses: IUserAddress[];
  isLoading: boolean;
  // selectedAddress: IUserAddress | null;

  // Actions
  fetchAddresses: () => Promise<void>;
  addAddress: (addressData: CreateAddressPayload) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  // getAddress: (id: string) => Promise<void>;
  updateAddress: (id: string, updates: Partial<IUserAddress>) => Promise<void>;
}
