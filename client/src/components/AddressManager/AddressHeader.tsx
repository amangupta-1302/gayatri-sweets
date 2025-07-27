import { Plus } from "lucide-react";

export interface AddressHeaderProps {
  addressCount: number;
  onAddNew: () => void;
  canAddMore: boolean;
}
const AddressHeader = ({
  addressCount,
  onAddNew,
  canAddMore,
}: AddressHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* ADDRESS COUNT INFO */}
      <div className="space-y-1">
        <p className="text:xs sm:text-sm text-gray-600">
          {addressCount}/5 addresses saved
        </p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
          <div
            className="bg-yellow-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{ width: `${(addressCount / 5) * 100}%` }}
          />
        </div>
      </div>
      {/* ADD BUTTON */}
      {canAddMore && (
        <button
          onClick={onAddNew}
          className="flex items-center justify-center gap-2 bg-yellow-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:bg-yellow-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto"
        >
          <Plus className="size-4 sm:size-5" />
          <span className="sm:inline">Add Address</span>
        </button>
      )}
    </div>
  );
};
export default AddressHeader;
