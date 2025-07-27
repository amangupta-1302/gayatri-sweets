const AddressLoadingState = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER SKELETON */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-2 bg-gray-200 rounded w-full animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-full sm:w-32 animate-pulse"></div>
      </div>

      {/* CARDS SKELETON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {[...Array(3)].map((_, index) => (
          <div
            className="p-3 sm:p-4 lg:p-5 border border-gray-200 rounded-lg animate-pulse"
            key={index}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="flex gap-1">
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressLoadingState;
