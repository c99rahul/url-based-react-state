import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";
import ErrorMessage from "../ErrorMessage";
import LoadingAnimation from "../LoadingAnimation";
import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";

export default function ProductPage() {
  const { product, loading, error } = useProduct();

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingAnimation />;
  if (!product) return null;

  // Since we've checked for null/undefined, we can safely assert the type
  const productData = product as Product;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="grid gap-8 p-6 lg:grid-cols-2">
            <ProductGallery
              thumbnail={productData.thumbnail}
              images={productData.images}
              title={productData.title}
            />
            <ProductInfo product={productData} />
          </div>
        </div>
      </div>
    </main>
  );
}
