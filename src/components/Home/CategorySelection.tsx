interface CategorySelectionProps {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

export default function CategorySelection({
  categories,
  selectedCategories,
  toggleCategory,
}: CategorySelectionProps) {
  return (
    <div className="space-y-3">
      <h3
        className="text-xs font-semibold uppercase tracking-widest text-[#464555]"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        Category
      </h3>
      <div className="space-y-2.5">
        {categories.map((cat) => (
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
  );
}
