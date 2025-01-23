import { useProduct } from "@/hooks/useProduct";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";

export default function ProductPage() {
  const { product, loading, error } = useProduct();

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingAnimation />;
  if (!product) return null;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="">
          <div className="grid gap-8 lg:grid-cols-2">
            <ProductGallery
              thumbnail={product.thumbnail}
              images={product.images}
              title={product.title}
            />
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
