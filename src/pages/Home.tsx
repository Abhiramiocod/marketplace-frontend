import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../lib/api";
import Logo from "../components/Logo";
import Navlinks from "../components/Navlinks";
import { Search } from "lucide-react";


// ── Types ──────────────────────────────────────────────────────────────────────
interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  stock: number;
  image: string;
  vendor: { id: number; store_name: string };
  category: { id: number; name: string };
}

interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
}

function mapApiProduct(p: ApiProduct): Product {
  return {
    id: p.id,
    brand: p.vendor.store_name,
    name: p.name,
    price: `$${parseFloat(p.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    rating: 0,
    image: p.image,
    category: p.category.name,
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${filled ? "fill-amber-400 text-amber-400" : "fill-none text-gray-300 stroke-current stroke-[1.5]"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: hovering
          ? "0 1px 2px rgba(0,0,0,0.04), 0 10px 24px rgba(53,37,205,0.10), 0 32px 48px rgba(53,37,205,0.06)"
          : "0 1px 2px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-2xl bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/85 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-5 h-5 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "fill-none text-gray-500 stroke-current stroke-[1.5]"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold tracking-widest text-[#3525cd] uppercase">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <StarIcon filled />
            <span className="text-xs font-semibold text-gray-700">
              {product.rating}
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 leading-snug text-[15px]">
          {product.name}
        </h3>

        <div className="flex justify-between items-center pt-1">
          <span className="text-lg font-semibold text-[#3525cd]">
            {product.price}
          </span>

          {/* Add to cart with tooltip */}
          <div className="relative">
            <button
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#3525cd] hover:text-white transition-all duration-200 flex items-center justify-center group/btn"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-[1.5]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
            {tooltipVisible && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-xl z-10">
                Login Required
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="aspect-[3/4] w-full rounded-2xl bg-gray-100" />
      <div className="h-4 w-3/4 rounded bg-gray-100" />
      <div className="h-3 w-1/2 rounded bg-gray-100" />
      <div className="flex justify-between items-center">
        <div className="h-5 w-1/4 rounded bg-gray-100" />
        <div className="h-9 w-9 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category"),
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") ?? "All Brands",
  );
  const [priceRange, setPriceRange] = useState(
    Number(searchParams.get("maxPrice")) || 5000,
  );
  const [ecoOnly, setEcoOnly] = useState(
    searchParams.get("ecoOnly") === "true",
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") ?? "Newest Arrivals",
  );
  const [showEmpty, setShowEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const json = await res.json();
        if (!json.success)
          throw new Error(json.message || "Failed to load products");
        setProducts((json.data as ApiProduct[]).map(mapApiProduct));
        const max =
          Math.ceil(
            Math.max(
              ...(json.data as ApiProduct[]).map((p: ApiProduct) =>
                parseFloat(p.price),
              ),
            ) / 100,
          ) * 100;
        setPriceRange(max);
      } catch (err: any) {
        setFetchError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Derive filter options from live data
  const CATEGORIES = [...new Set(products.map((p) => p.category))].sort();
  const BRANDS = [
    "All Brands",
    ...[...new Set(products.map((p) => p.brand))].sort(),
  ];
  const maxPrice = products.length
    ? Math.ceil(
        Math.max(
          ...products.map((p) => parseFloat(p.price.replace(/[$,]/g, ""))),
        ) / 100,
      ) * 100
    : 5000;

  const updateSearchParams = (newCategories: string[], newBrand: string, newPriceRange: number, newEcoOnly: boolean, newSortBy: string) => {
    const params = new URLSearchParams();
    newCategories.forEach(cat => params.append("category", cat));
    if (newBrand !== "All Brands") params.set("brand", newBrand);
    if (newPriceRange !== maxPrice) params.set("maxPrice", newPriceRange.toString());
    if (newEcoOnly) params.set("ecoOnly", "true");
    if (newSortBy !== "Newest Arrivals") params.set("sort", newSortBy);
    setSearchParams(params);
  };

  const toggleCategory = (cat: string) => {
    const newCategories = selectedCategories.includes(cat) 
      ? selectedCategories.filter((c) => c !== cat) 
      : [...selectedCategories, cat];
    setSelectedCategories(newCategories);
    updateSearchParams(newCategories, selectedBrand, priceRange, ecoOnly, sortBy);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrand("All Brands");
    setPriceRange(maxPrice);
    setEcoOnly(false);
    setShowEmpty(false);
    setSortBy("Newest Arrivals");
    setSearchParams({});
  };

  const handleSearch = () => setShowEmpty((v) => !v);

  // Apply filters
  let displayedProducts = showEmpty ? [] : products;
  if (!showEmpty) {
    if (selectedCategories.length > 0)
      displayedProducts = displayedProducts.filter((p) =>
        selectedCategories.includes(p.category),
      );
    if (selectedBrand !== "All Brands")
      displayedProducts = displayedProducts.filter(
        (p) => p.brand === selectedBrand,
      );
    displayedProducts = displayedProducts.filter(
      (p) => parseFloat(p.price.replace(/[$,]/g, "")) <= priceRange,
    );
    if (sortBy === "Price: Low to High")
      displayedProducts = [...displayedProducts].sort(
        (a, b) =>
          parseFloat(a.price.replace(/[$,]/g, "")) -
          parseFloat(b.price.replace(/[$,]/g, "")),
      );
    else if (sortBy === "Price: High to Low")
      displayedProducts = [...displayedProducts].sort(
        (a, b) =>
          parseFloat(b.price.replace(/[$,]/g, "")) -
          parseFloat(a.price.replace(/[$,]/g, "")),
      );
  }

  return (
    <div
      className="bg-[#f7f9fb] text-[#191c1e] min-h-screen overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── Nav ── */}
      <header
        ref={navRef}
        className="fixed top-0 w-full z-50 border-b border-gray-200/40 shadow-sm"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.82)",
        }}
      >
        <div className="flex justify-between items-center h-20 px-8 w-full">
          {/* Logo + Nav links */}
          <div className="flex items-center gap-8">
            <Logo />
            <Navlinks />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSearch}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 fill-none stroke-[#464555] stroke-[1.5]" />
            </button>

            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#464555] hover:text-[#3525cd] transition-colors"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-[1.5]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="hidden sm:inline">Cart</span>
            </button>

            <button
              className="bg-[#3525cd] text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:bg-[#2a1db0] active:scale-95 transition-all"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="pt-32 pb-16 w-full px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* ── Sidebar ── */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/60">
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Filters
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-[#3525cd] hover:underline uppercase tracking-wider"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Clear all
                </button>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <h3
                  className="text-xs font-semibold uppercase tracking-widest text-[#464555]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  Category
                </h3>
                <div className="space-y-2.5">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded border-gray-300 text-[#3525cd] focus:ring-[#3525cd]/20"
                      />
                      <span className="text-sm text-[#191c1e] group-hover:text-[#3525cd] transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
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
                      updateSearchParams(selectedCategories, selectedBrand, newPriceRange, ecoOnly, sortBy);
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

              {/* Brand */}
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
                    updateSearchParams(selectedCategories, newBrand, priceRange, ecoOnly, sortBy);
                  }}
                  className="w-full bg-[#f2f4f6] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] outline-none transition-all"
                >
                  {BRANDS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Eco-Shipping Toggle */}
              <div>
                <label className="relative inline-flex items-center cursor-pointer gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={ecoOnly}
                      onChange={() => {
                        const newEcoOnly = !ecoOnly;
                        setEcoOnly(newEcoOnly);
                        updateSearchParams(selectedCategories, selectedBrand, priceRange, newEcoOnly, sortBy);
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
            </div>
          </aside>

          {/* ── Product Area ── */}
          <div className="flex-grow space-y-6">
            {/* Sort bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white px-5 py-4 rounded-2xl border border-gray-100">
              <p className="text-sm text-[#464555]">
                Showing{" "}
                <span className="font-semibold text-[#191c1e]">
                  {displayedProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#191c1e]">
                  {products.length}
                </span>{" "}
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
                    updateSearchParams(selectedCategories, selectedBrand, priceRange, ecoOnly, newSortBy);
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

            {/* Grid */}
            {loading ? (
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

            {/* Load more spinner */}
            {!loading && !showEmpty && (
              <div className="flex justify-center py-12">
                <div className="flex items-center gap-3 text-[#464555]">
                  <div className="w-5 h-5 border-2 border-[#3525cd] border-t-transparent rounded-full animate-spin" />
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Loading more curated products...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-16 bg-[#f7f9fb] border-t border-gray-200/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 w-full">
          {/* Brand */}
          <div className="space-y-4">
            <span
              className="text-xl font-black tracking-tight text-[#191c1e]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              LuxeMarket
            </span>
            <p className="text-sm text-[#464555] leading-relaxed">
              Curated excellence for the modern digital life. Sourcing the
              world's finest goods.
            </p>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold text-[#191c1e]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-[#464555] hover:text-[#3525cd] transition-colors font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold text-[#191c1e]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Solutions
            </h4>
            <ul className="space-y-2">
              {["Vendor Portal", "Global Shipping"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-[#464555] hover:text-[#3525cd] transition-colors font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold text-[#191c1e]"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Newsletter
            </h4>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="bg-[#f2f4f6] border border-gray-200 rounded-l-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all"
              />
              <button
                className="bg-[#3525cd] text-white px-4 py-2.5 rounded-r-xl text-xs font-bold hover:bg-[#2a1db0] transition-colors"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Join
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div
            className="md:col-span-4 pt-8 text-center text-xs text-[#464555] font-semibold"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            © 2026 LuxeMarket Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
