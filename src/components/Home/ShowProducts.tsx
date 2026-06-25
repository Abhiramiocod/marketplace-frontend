interface ShowProductsProps {
  loading: boolean;
  isSearching: boolean;
  fetchError: string;
  displayedProducts: any[];
  clearAllFilters: () => void;
  ProductCard: React.ComponentType<{ product: any }>;
  SkeletonCard: React.ComponentType<{}>;
}

export default function ShowProducts({
  loading,
  isSearching,
  fetchError,
  displayedProducts,
  clearAllFilters,
  ProductCard,
  SkeletonCard,
}: ShowProductsProps) {
  return (
    <>
      {loading || isSearching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : fetchError ? (
        /* Error state */
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <div className="w-20 h-20 bg-red-50 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-9 h-9 fill-none stroke-red-400 stroke-[1.5]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h2
            className="text-xl font-semibold text-gray-900"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Failed to load products
          </h2>
          <p className="text-sm text-[#464555] max-w-xs">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#3525cd] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all active:scale-95"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Retry
          </button>
        </div>
      ) : displayedProducts.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
          <div className="w-24 h-24 bg-[#eceef0] flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-10 h-10 fill-none stroke-[#464555] stroke-[1.5]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2
              className="text-3xl font-semibold tracking-tight"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              No products found
            </h2>
            <p className="text-[#464555] max-w-sm mx-auto text-sm leading-relaxed">
              We couldn't find anything matching your current filters. Try
              adjusting your search or clearing the filters.
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="bg-[#3525cd] text-white px-8 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all active:scale-95"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
