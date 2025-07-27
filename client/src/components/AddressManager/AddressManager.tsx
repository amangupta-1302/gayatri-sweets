import { useEffect, useState } from "react";
import { useAddressStore } from "../../store/addressStore";
import type { IUserAddress } from "../../utils/types/user";
import AddressHeader from "./AddressHeader";
import AddressGrid from "./AddressGrid";
import AddressEmpty from "./AddressEmpty";
import AddressLoadingState from "./AddressLoadingState";
import AddressLimitWarning from "./AddressLimitWarning";
import AddressModal from "../../modals/AddressModal";

const AddressManager = () => {
  const { isLoading, addresses, fetchAddresses } = useAddressStore();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<IUserAddress | null>(
    null
  );

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses, showAddressModal]);

  const handleEdit = (address: IUserAddress) => {
    setEditingAddress(address);
    setShowAddressModal(true);
  };
  const handleAddNew = () => {
    setEditingAddress(null);
    setShowAddressModal(true);
  };

  const handleCloseModal = () => {
    setShowAddressModal(false);
    setEditingAddress(null);
  };

  //Loading state
  if (isLoading && (!addresses || addresses.length === 0)) {
    return <AddressLoadingState />;
  }
  return (
    <div className="space-y-4 md:space-y-6">
      {/* HEADER WITH ADD BUTTON */}
      {addresses && addresses.length > 0 && (
        <AddressHeader
          addressCount={addresses?.length || 0}
          onAddNew={handleAddNew}
          canAddMore={(addresses?.length || 0) < 5}
        />
      )}

      {/* MAIN CONTENT */}
      {addresses && addresses.length > 0 ? (
        <>
          <AddressGrid addresses={addresses} onEdit={handleEdit} />
          {addresses.length >= 5 && <AddressLimitWarning />}
        </>
      ) : (
        <AddressEmpty onAddNew={handleAddNew} />
      )}

      {/* MODAL */}
      {showAddressModal && (
        <AddressModal
          isOpen={showAddressModal}
          onClose={handleCloseModal}
          editingAddress={editingAddress}
        />
      )}
    </div>
  );
};

export default AddressManager;
