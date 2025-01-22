import { useProduct } from "@/hooks/useProduct";
import { Loader2 } from "lucide-react";

export function ProductPage() {
  const { product, loading, error } = useProduct();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-red-50 p-6 text-red-600">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex h-96 items-center justify-center rounded-lg border border-gray-200 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="grid gap-8 p-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product?.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      className="aspect-square rounded border border-gray-200 object-cover"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6 py-8 max-w-md">
                <div>
                  <p className="text-sm text-gray-500">{product?.brand}</p>
                  <h1 className="mt-1 text-2xl font-semibold text-gray-900">
                    {product?.title}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-lg text-gray-700">
                      ★ {product?.rating.toFixed(1)}
                    </span>
                  </div>
                  <div
                    className={`text-sm ${
                      (product?.stock ?? 0) < 10
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {(product?.stock ?? 0) < 10
                      ? `Only ${product?.stock} left`
                      : "In Stock"}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-gray-900">
                      ${product?.price}
                    </p>
                    {(product?.discountPercentage ?? 0) > 0 && (
                      <>
                        <p className="text-lg text-gray-500 line-through">
                          $
                          {Math.round(
                            (product?.price ?? 0) /
                              (1 - (product?.discountPercentage ?? 0) / 100)
                          )}
                        </p>
                        <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                          -{Math.round(product?.discountPercentage ?? 0)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-gray-600">{product?.description}</p>

                <div className="space-y-1 pt-4">
                  <p className="text-sm text-gray-500">
                    Category: {product?.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    Brand: {product?.brand}
                  </p>
                </div>

                <button
                  className="rounded-lg border border-gray-900 bg-gray-900 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                  onClick={() => console.log("Added to cart")}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
