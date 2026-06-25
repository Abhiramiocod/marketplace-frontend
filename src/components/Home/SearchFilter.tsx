import { Search } from "lucide-react";

interface SearchSuggestion {
  id: number;
  name: string;
  brand: string;
  image: string;
}

interface SearchFilterProps {
  searchTerm: string;
  searchSuggestions: SearchSuggestion[];
  isLoadingSuggestions: boolean;
  showSuggestions: boolean;
  onSearch: (term?: string) => void | Promise<void>;
  onSearchTermChange: (value: string) => void;
  onShowSuggestionsChange: (value: boolean) => void;
}

export default function SearchFilter({
  searchTerm,
  searchSuggestions,
  isLoadingSuggestions,
  showSuggestions,
  onSearch,
  onSearchTermChange,
  onShowSuggestionsChange,
}: SearchFilterProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="relative flex items-center bg-[#f2f4f6] border border-transparent rounded-full pl-4 pr-1 py-1 focus-within:border-[#3525cd]/30 focus-within:bg-white transition-all"
    >
      <Search className="w-5 h-5 fill-none stroke-[#464555] stroke-[1.5] flex-shrink-0" />
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        onFocus={() => {
          if (searchTerm.trim()) onShowSuggestionsChange(true);
        }}
        onBlur={() => {
          setTimeout(() => onShowSuggestionsChange(false), 120);
        }}
        placeholder="Search products..."
        className="w-40 sm:w-56 bg-transparent px-2 py-1.5 text-sm text-[#191c1e] placeholder:text-[#7b7b88] outline-none"
      />

      {showSuggestions && searchTerm.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {isLoadingSuggestions ? (
            <div className="px-4 py-3 text-sm text-[#464555]">
              Searching...
            </div>
          ) : searchSuggestions.length > 0 ? (
            <div className="py-1">
              {searchSuggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onSearchTermChange(product.name);
                    onSearch(product.name);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-[#f2f4f6] transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover bg-gray-100"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[#191c1e]">
                      {product.name}
                    </span>
                    <span className="block truncate text-xs text-[#464555]">
                      {product.brand}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-[#464555]">
              No suggestions found
            </div>
          )}
        </div>
      )}
    </form>
  );
}
