interface SortBarProps {
  displayedProducts: any[];
  products: any[];
  sortBy: string;
  setSortBy: (sortBy: string) => void;
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
  ecoOnly: boolean;
}

export default function SortBar({
  displayedProducts,
  products,
  sortBy,
  setSortBy,
  updateSearchParams,
  selectedCategories,
  selectedBrand,
  priceRange,
  ecoOnly,
}: SortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white px-5 py-4 rounded-2xl border border-gray-100">
      <p className="text-sm text-[#464555]">
        Showing{" "}
        <span className="font-semibold text-[#191c1e]">
          {displayedProducts.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#191c1e]">{products.length}</span>{" "}
        products
      </p>
      <div className="flex items-center gap-3">
        <span
          className="text-sm text-[#464555] whitespace-nowrap"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => {
            const newSortBy = e.target.value;
            setSortBy(newSortBy);
            updateSearchParams(
              selectedCategories,
              selectedBrand,
              priceRange,
              ecoOnly,
              newSortBy,
            );
          }}
          className="bg-transparent border-none text-sm font-semibold text-[#191c1e] focus:ring-0 cursor-pointer outline-none"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          {[
            "Newest Arrivals",
            "Price: Low to High",
            "Price: High to Low",
            "Highest Rated",
          ].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
