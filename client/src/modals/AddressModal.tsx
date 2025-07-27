import { useEffect, useState } from "react";
import { useAddressStore } from "../store/addressStore";
import type { CreateAddressPayload, IUserAddress } from "../utils/types/user";
import { MapPin, X } from "lucide-react";
import { createPortal } from "react-dom";

interface IAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingAddress?: IUserAddress | null;
}

const AddressModal: React.FC<IAddressModalProps> = ({
  isOpen,
  onClose,
  editingAddress,
}) => {
  const { addAddress, updateAddress, isLoading } = useAddressStore();
  const [formData, setFormData] = useState<CreateAddressPayload>({
    fullname: "",
    phone: "",
    addressLine: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    label: "Home",
    customLabel: "",
  });

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        fullname: editingAddress.fullname,
        phone: editingAddress.phone,
        addressLine: editingAddress.addressLine,
        landmark: editingAddress.landmark,
        label: editingAddress.label,
        city: editingAddress.city,
        state: editingAddress.state,
        pincode: editingAddress.pincode,
        customLabel: editingAddress.customLabel || "",
      });
    } else {
      setFormData({
        fullname: "",
        phone: "",
        addressLine: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        label: "Home",
        customLabel: "",
      });
    }
  }, [editingAddress, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, formData);
      } else {
        await addAddress(formData);
      }
      onClose();
    } catch (Err) {
      console.error("Form submission error: ", Err);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <MapPin className="size-4 text-yellow-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
              {editingAddress ? "Edit Address" : "Add Address"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="size-5" />
          </button>
        </div>
        {/* MODAL BODY */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* FULLNAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="Enter full name"
              required
            />
          </div>
          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="Enter 10-digit phone number"
              required
            />
          </div>
          {/* ADDRESS LINE  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              name="addressLine"
              value={formData.addressLine}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="House No, Street, Area"
              required
            />
          </div>
          {/* LANDMARK */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="Nearby landmark (optional)"
            />
          </div>
          {/* CITY*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="City"
              required
            />
          </div>
          {/* STATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="State"
              required
            />
          </div>
          {/* PINCODE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode *
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
              placeholder="6 digit pincode"
              required
            />
          </div>
          {/* ADDRESS LABEL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Type *
            </label>
            <select
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors bg-white bg-[url('data:image/svg+xml;utf8,<svg fill=\'%23666\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')] bg-no-repeat bg-[right_1rem_center]"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* CUSTOM LABEL FOR OTHER */}
          {formData.label === "Other" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Label *
              </label>
              <input
                type="text"
                name="customLabel"
                value={formData.customLabel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                placeholder="e.g., Friend's House , Gym, etc"
                required={formData.label === "Other"}
              />
            </div>
          )}
          {/* FORM ACTIONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {isLoading
                ? "Saving..."
                : editingAddress
                ? "Update Address"
                : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
export default AddressModal;
