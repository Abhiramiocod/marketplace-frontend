interface FiltersClearAllProps {
  clearAllFilters: () => void;
}

export default function FiltersClearAll({
  clearAllFilters,
}: FiltersClearAllProps) {
  return (
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
  );
}
