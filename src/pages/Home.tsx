import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../lib/api";
import Logo from "../components/Home/Logo";
import Navlinks from "../components/Home/Navlinks";
import SearchFilter from "../components/Home/SearchFilter";
import Cart from "../components/Home/Cart";
import LoginButton from "../components/Home/LoginButton";
import FiltersClearAll from "../components/Home/FiltersClearAll";
import CategorySelection from "../components/Home/CategorySelection";
import PriceRange from "../components/Home/PriceRange";
import Brand from "../components/Home/Brand";
import EcoShipping from "../components/Home/EcoShipping";
import SortBar from "../components/Home/SortBar";
import ShowProducts from "../components/Home/ShowProducts";
import Copyright from "../components/Home/Copyright";
import NewsLetterFooter from "../components/Home/NewsLetterFooter";
import FooterSolutions from "../components/Home/FooterSolutions";
import FooterCompany from "../components/Home/FooterCompany";
import FooterBrand from "../components/Home/FooterBrand";

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
    <Star
      className={`w-4 h-4 ${filled ? "fill-amber-400 text-amber-400" : "fill-none text-gray-300 stroke-current stroke-[1.5]"}`}
      strokeWidth={1.5}
    />
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [email, setEmail] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const submittedSearchRef = useRef("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const json = await res.json();
        if (!json.success)
          throw new Error(json.message || "Failed to load products");
        const mappedProducts = (json.data as ApiProduct[]).map(mapApiProduct);
        setProducts(mappedProducts);
        setAllProducts(mappedProducts);
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

  useEffect(() => {
    const query = searchTerm.trim();

    if (!query) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setIsLoadingSuggestions(false);
      submittedSearchRef.current = "";
      return;
    }

    if (query === submittedSearchRef.current) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      setIsLoadingSuggestions(false);
      return;
    }

    let isCancelled = false;

    const fetchSuggestions = async () => {
      try {
        setIsLoadingSuggestions(true);
        await new Promise((resolve) => setTimeout(resolve, 350));
        if (isCancelled) return;

        const params = new URLSearchParams({ search: query });
        const res = await fetch(`${API_URL}/products/search?${params}`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const json = await res.json();
        if (!json.success)
          throw new Error(json.message || "Failed to load suggestions");
        if (isCancelled) return;

        setSearchSuggestions(
          (json.data as ApiProduct[]).map(mapApiProduct).slice(0, 6),
        );
        setShowSuggestions(true);
      } catch {
        if (!isCancelled) setSearchSuggestions([]);
      } finally {
        if (!isCancelled) setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();

    return () => {
      isCancelled = true;
    };
  }, [searchTerm]);

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

  const updateSearchParams = (
    newCategories: string[],
    newBrand: string,
    newPriceRange: number,
    newEcoOnly: boolean,
    newSortBy: string,
  ) => {
    const params = new URLSearchParams();
    newCategories.forEach((cat) => params.append("category", cat));
    if (newBrand !== "All Brands") params.set("brand", newBrand);
    if (newPriceRange !== maxPrice)
      params.set("maxPrice", newPriceRange.toString());
    if (newEcoOnly) params.set("ecoOnly", "true");
    if (newSortBy !== "Newest Arrivals") params.set("sort", newSortBy);
    setSearchParams(params);
  };

  const toggleCategory = (cat: string) => {
    const newCategories = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(newCategories);
    updateSearchParams(
      newCategories,
      selectedBrand,
      priceRange,
      ecoOnly,
      sortBy,
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrand("All Brands");
    setPriceRange(maxPrice);
    setEcoOnly(false);
    setSearchTerm("");
    setSearchSuggestions([]);
    setShowSuggestions(false);
    setProducts(allProducts);
    setSortBy("Newest Arrivals");
    setSearchParams({});
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() !== submittedSearchRef.current) {
      submittedSearchRef.current = "";
    }
    if (!value.trim()) setProducts(allProducts);
  };

  const handleSearch = async (term = searchTerm) => {
    const query = term.trim();

    if (!query) {
      setProducts(allProducts);
      setFetchError(null);
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    submittedSearchRef.current = query;

    try {
      setIsSearching(true);
      setFetchError(null);
      const params = new URLSearchParams({ search: query });
      const res = await fetch(`${API_URL}/products/search?${params}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const json = await res.json();
      if (!json.success)
        throw new Error(json.message || "Failed to search products");

      setProducts((json.data as ApiProduct[]).map(mapApiProduct));
      setSearchSuggestions([]);
      setShowSuggestions(false);
    } catch (err: any) {
      setFetchError(err.message ?? "Unknown error");
    } finally {
      setIsSearching(false);
    }
  };

  // Apply filters
  let displayedProducts = products;
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
            <SearchFilter
              searchTerm={searchTerm}
              searchSuggestions={searchSuggestions}
              isLoadingSuggestions={isLoadingSuggestions}
              showSuggestions={showSuggestions}
              onSearch={handleSearch}
              onSearchTermChange={handleSearchTermChange}
              onShowSuggestionsChange={setShowSuggestions}
            />
            <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
            <LoginButton />
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
              <FiltersClearAll clearAllFilters={clearAllFilters} />

              <CategorySelection
                categories={CATEGORIES}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
              />

              {/* Price Range */}
              <PriceRange
                priceRange={priceRange}
                maxPrice={maxPrice}
                setPriceRange={setPriceRange}
                updateSearchParams={updateSearchParams}
                selectedCategories={selectedCategories}
                selectedBrand={selectedBrand}
                ecoOnly={ecoOnly}
                sortBy={sortBy}
              />

              {/* Brand */}
              <Brand
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                updateSearchParams={updateSearchParams}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                ecoOnly={ecoOnly}
                sortBy={sortBy}
                brands={BRANDS}
              />

              {/* Eco-Shipping Toggle */}
              <EcoShipping
                ecoOnly={ecoOnly}
                setEcoOnly={setEcoOnly}
                updateSearchParams={updateSearchParams}
                selectedCategories={selectedCategories}
                selectedBrand={selectedBrand}
                priceRange={priceRange}
                sortBy={sortBy}
              />
            </div>
          </aside>

          {/* ── Product Area ── */}
          <div className="flex-grow space-y-6">
            {/* Sort bar */}
            <SortBar
              displayedProducts={displayedProducts}
              products={products}
              sortBy={sortBy}
              setSortBy={setSortBy}
              updateSearchParams={updateSearchParams}
              selectedCategories={selectedCategories}
              selectedBrand={selectedBrand}
              priceRange={priceRange}
              ecoOnly={ecoOnly}
            />

            {/* Grid */}
            <ShowProducts
              loading={loading}
              isSearching={isSearching}
              fetchError={fetchError}
              displayedProducts={displayedProducts}
              clearAllFilters={clearAllFilters}
              ProductCard={ProductCard}
              SkeletonCard={SkeletonCard}
            />
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-16 bg-[#f7f9fb] border-t border-gray-200/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 w-full">
          {/* Brand */}
          <FooterBrand />

          {/* Company */}
          <FooterCompany />

          {/* Solutions */}
          <FooterSolutions />

          {/* Newsletter */}
          <NewsLetterFooter email={email} setEmail={setEmail} />

          {/* Copyright */}
          <Copyright />
        </div>
      </footer>
    </div>
  );
}
