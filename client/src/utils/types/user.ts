//User interface
export interface IUser {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  password: string;
  role: "admin" | "customer";
  addresses: [];
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
