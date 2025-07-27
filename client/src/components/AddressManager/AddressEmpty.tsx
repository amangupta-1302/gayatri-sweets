import { MapPin, Plus } from "lucide-react";

interface AddressEmptyProps {
  onAddNew: () => void;
}
const AddressEmpty = ({ onAddNew }: AddressEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="size-16 sm:size-20 lg:size-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
        <MapPin className="size-8 sm:size-10 lg:size-12 text-gray-400" />
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        No addresses saved yet
      </h3>
      <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-sm">
        Add your first delivery address to get started with orders
      </p>

      <button
        onClick={onAddNew}
        className="flex items-center justify-center gap-2 bg-yellow-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:bg-yellow-700 transition-colors font-medium text-sm sm:text-base w-auto"
      >
        <Plus className="size-4 sm:size-5" />
        Add Your First Address
      </button>
    </div>
  );
};

export default AddressEmpty;
