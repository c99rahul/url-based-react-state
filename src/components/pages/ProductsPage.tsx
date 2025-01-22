import { PRODUCTS_PER_PAGE } from "@/data/constants";
import { useProducts } from "@/hooks/useProducts";
import ErrorMessage from "../ErrorMessage";
import LoadingAnimation from "../LoadingAnimation";
import ProductGrid from "../ProductGrid";
import Pagination from "../ProductPagination";
import { Sidebar } from "../Sidebar";

export default function ProductsPage() {
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
    return <ErrorMessage message={error.message} />;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar />

          <section className="flex-1 space-y-8">
            {loading ? (
              <LoadingAnimation />
            ) : (
              <>
                <ProductGrid products={products} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onNext={goToNext}
                  onPrevious={goToPrevious}
                  hasNext={hasNext}
                  hasPrevious={hasPrevious}
                  isLoading={loading}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
