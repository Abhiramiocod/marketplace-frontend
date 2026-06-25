interface PriceRangeProps {
  priceRange: number;
  maxPrice: number;
  setPriceRange: (priceRange: number) => void;
  updateSearchParams: (selectedCategories: string[], selectedBrand: string, priceRange: number, ecoOnly: boolean, sortBy: string) => void;
  selectedCategories: string[];
  selectedBrand: string;
  ecoOnly: boolean;
  sortBy: string;
}

export default function PriceRange({priceRange, maxPrice, setPriceRange, updateSearchParams, selectedCategories, selectedBrand, ecoOnly, sortBy}: PriceRangeProps) {
  return (
    <div className="space-y-3">
      <h3
        className="text-xs font-semibold uppercase tracking-widest text-[#464555]"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        Price Range
      </h3>
      <div className="px-1">
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={50}
          value={priceRange}
          onChange={(e) => {
            const newPriceRange = Number(e.target.value);
            setPriceRange(newPriceRange);
            updateSearchParams(
              selectedCategories,
              selectedBrand,
              newPriceRange,
              ecoOnly,
              sortBy,
            );
          }}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#3525cd] bg-[#dae2fd]"
        />
        <div
          className="flex justify-between mt-2 text-xs font-semibold text-[#464555]"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span>$0</span>
          <span>
            ${priceRange.toLocaleString()}
            {priceRange >= maxPrice ? "+" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
