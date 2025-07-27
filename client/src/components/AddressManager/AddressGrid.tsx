import AddressCard from "./AddressCard";
import type { IUserAddress } from "../../utils/types/user";

interface IAddressGridProps {
  addresses: IUserAddress[];
  onEdit: (address: IUserAddress) => void;
}

const AddressGrid = ({ addresses, onEdit }: IAddressGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
      {addresses.map((address) => (
        <AddressCard
          key={address._id}
          address={address}
          onEdit={() => onEdit(address)}
        />
      ))}
    </div>
  );
};
export default AddressGrid;
