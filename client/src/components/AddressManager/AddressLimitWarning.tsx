const AddressLimitWarning = () => {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
      <div className="flex items-start gap-3">
        <div className="size-5 sm:size-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-orange-600 text-sm font-bold">!</span>
        </div>
        <div>
          <h4 className="font-medium text-orange-900 text-sm sm:text-base">
            Address Limit Reached
          </h4>
          <p className="text-orange-700 text-start sm:text-sm mt-1">
            You have reached the maximum limit of 5 addresses.Delete an existing
            address to add a new one.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AddressLimitWarning;
