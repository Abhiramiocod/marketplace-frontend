interface EcoShippingProps {
  ecoOnly: boolean;
  setEcoOnly: (value: boolean) => void;
  updateSearchParams: (
    selectedCategories: string[],
    selectedBrand: string,
    priceRange: number,
    ecoOnly: boolean,
    sortBy: string,
  ) => void;
  selectedCategories: string[];
  selectedBrand: string;
  priceRange: number;
  sortBy: string;
}

export default function EcoShipping({
  ecoOnly,
  setEcoOnly,
  updateSearchParams,
  selectedCategories,
  selectedBrand,
  priceRange,
  sortBy,
}: EcoShippingProps) {
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer gap-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={ecoOnly}
            onChange={() => {
              const newEcoOnly = !ecoOnly;
              setEcoOnly(newEcoOnly);
              updateSearchParams(
                selectedCategories,
                selectedBrand,
                priceRange,
                newEcoOnly,
                sortBy,
              );
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[#e0e3e5] rounded-full peer peer-checked:bg-[#3525cd] transition-colors duration-200" />
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5" />
        </div>
        <span
          className="text-sm font-semibold text-[#191c1e]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Eco-Shipping Only
        </span>
      </label>
    </div>
  );
}
