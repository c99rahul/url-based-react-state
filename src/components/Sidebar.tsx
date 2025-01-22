import { SORT_OPTIONS } from "@/data/constants";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, loading, error } = useCategories();

  if (error) {
    return (
      <div className="p-4 text-sm text-red-600">Failed to load categories</div>
    );
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const category = event.target.value;

      category ? params.set("category", category) : params.delete("category");
      params.set("page", "1");
      return params;
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const [sortBy, order] = event.target.value.split("-");

      if (sortBy && order) {
        params.set("sortBy", sortBy);
        params.set("order", order);
      } else {
        params.delete("sortBy");
        params.delete("order");
      }
      params.set("page", "1");
      return params;
    });
  };

  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");
  const category = searchParams.get("category");
  const currentSortValue = sortBy && order ? `${sortBy}-${order}` : "";

  const selectClassName =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900";

  return (
    <aside className={`hidden md:block w-60 flex-shrink-0 ${className}`}>
      <div className="sticky top-4">
        <div className="space-y-2 rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Filter Products
            </h2>
          </div>
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-900"
              >
                Category
              </label>
              <select
                id="category"
                value={category || ""}
                onChange={handleCategoryChange}
                className={selectClassName}
                disabled={loading}
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-900"
              >
                Sort By
              </label>
              <select
                id="sort"
                value={currentSortValue}
                onChange={handleSortChange}
                className={selectClassName}
              >
                <option value="">Default Sorting</option>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
