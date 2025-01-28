import { useProducts } from "@/hooks/useProducts";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/product/ProductPagination";
import Sidebar from "@/components/layout/Sidebar";
import { PAGINATION_CONFIG } from "@/config/pagination";

export default function ProductsPage() {
  const {
    products,
    isLoading,
    error,
    currentPage,
    totalPages,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
  } = useProducts(PAGINATION_CONFIG.ITEMS_PER_PAGE);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar />

          <section className="flex-1 space-y-8">
            {isLoading ? (
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
                  isLoading={isLoading}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
