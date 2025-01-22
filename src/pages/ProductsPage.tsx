import { Sidebar } from "@/components/Sidebar";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS_PER_PAGE } from "@/data/constants";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

export function ProductsPage() {
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
  } = useProducts(PRODUCTS_PER_PAGE);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-red-50 p-6 text-red-600">
          Error loading products: {error.message}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar />

          <section className="flex-1 space-y-8">
            {loading ? (
              <div className="flex h-96 items-center justify-center rounded-lg border border-gray-200 bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <nav
                  className="flex items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-4"
                  aria-label="Pagination"
                >
                  <button
                    onClick={goToPrevious}
                    disabled={!hasPrevious || loading}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={goToNext}
                    disabled={!hasNext || loading}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </nav>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
