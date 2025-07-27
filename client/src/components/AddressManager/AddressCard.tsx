import { useState } from "react";
import { useAddressStore } from "../../store/addressStore";
import type { IUserAddress } from "../../utils/types/user";
import {
  Building2,
  Edit,
  Home,
  MapPin,
  Phone,
  Star,
  Trash2,
} from "lucide-react";

interface AddressCardProps {
  address: IUserAddress;
  onEdit: () => void;
}

const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  const { deleteAddress } = useAddressStore();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setIsDeleting(true);
      try {
        await deleteAddress(address._id);
      } catch (err) {
        console.error("Delete failed: ", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getLabelIcon = (label: string) => {
    switch (label) {
      case "Home":
        return <Home className="size-3 sm:size-4 text-green-600" />;
      case "Work":
        return <Building2 className="size-3 sm:size-4 text-blue-600" />;

      default:
        return <MapPin className="size-3 sm:size-4 text-purple-600" />;
    }
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Home":
        return "bg-green-50 text-green-700 border-green-200";
      case "Work":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };
  const handleSetDefault = () => {
    //todo: implement this
    console.log("Set as default : ", address._id);
  };

  return (
    <div
      className={`p-3 sm:p-4 lg:p-5 rounded-lg border-2 transition-all hover:shadow-md ${
        address.isDefault
          ? "border-yellow-300 bg-yellow-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getLabelColor(
              address.label
            )}`}
          >
            {getLabelIcon(address.label)}
            <span className="truncate max-w-20 sm:max-w-none">
              {address.customLabel || address.label}
            </span>
          </div>
          {address.isDefault && (
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              <Star className="size-3 fill-current" />
              <span className="hidden sm:inline">Default</span>
            </div>
          )}
        </div>
        {/* ACTION BUTTON */}
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit address"
          >
            <Edit className="size-3 sm:size-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            title="Delete address"
          >
            <Trash2 className="size-3 sm:size-4" />
          </button>
        </div>
      </div>
      {/* ADDRESS DETAILS */}
      <div className="space-y-2">
        <h4 className="ld text-gray-900 text-sm sm:text-base lg:text-lg truncate">
          {address.fullname}
        </h4>
        <div className="text-gray-600 text-xs sm:text-sm">
          <p className="line-clamp-2 leading-relaxed">{address.addressLine}</p>
          {address.landmark && (
            <p className="text-gray-500 mt-1 line-clamp-1">
              Near {address.landmark}
            </p>
          )}
        </div>
        <p className="text-gray-600 text-xs sm:text-sm truncate">
          {address.city} , {address.state} - {address.pincode}
        </p>

        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm pt-1 sm:pt-2">
          <Phone className="size-3 sm:size-4 flex-shrink-0" />
          <span className="truncate">{address.phone}</span>
        </div>
      </div>
      {/* SET AS DEFAULT BUTTON */}
      {!address.isDefault && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-50-200">
          <button
            onClick={handleSetDefault}
            className="text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm font-medium hover:underline w-full text-left"
          >
            Set as default address
          </button>
        </div>
      )}
    </div>
  );
};
export default AddressCard;
