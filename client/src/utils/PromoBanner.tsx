const PromoBanner = () => {
  return (
    <div className="w-full bg-red-600 overflow-hidden">
      <div className="flex w-max whitespace-nowrap animate-scroll">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="mx-8 text-white text-sm font-medium">
            🚚 Free shipping on orders above ₹999/-
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
