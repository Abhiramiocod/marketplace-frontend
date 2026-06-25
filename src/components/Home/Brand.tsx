interface BrandProps {
    selectedBrand: string;
    setSelectedBrand: (brand: string) => void;
    updateSearchParams: (
      selectedCategories: string[],
      selectedBrand: string,
      priceRange: number,
      ecoOnly: boolean,
      sortBy: string,
    ) => void;
    selectedCategories: string[];
    priceRange: number;
    ecoOnly: boolean;
    sortBy: string;
    brands: string[];
}

export default function Brand({ selectedBrand, setSelectedBrand, updateSearchParams, selectedCategories, priceRange, ecoOnly, sortBy, brands }: BrandProps) {
    return (
        <div className="space-y-3">
                <h3
                  className="text-xs font-semibold uppercase tracking-widest text-[#464555]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Brand
                </h3>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    const newBrand = e.target.value;
                    setSelectedBrand(newBrand);
                    updateSearchParams(
                      selectedCategories,
                      newBrand,
                      priceRange,
                      ecoOnly,
                      sortBy,
                    );
                  }}
                  className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] outline-none transition-all"
                >
                  {brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
    )
}