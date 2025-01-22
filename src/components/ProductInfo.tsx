import { Product } from "@/types/product";

interface ProductInfoProps {
  product: Pick<
    Product,
    | "brand"
    | "title"
    | "rating"
    | "stock"
    | "price"
    | "discountPercentage"
    | "description"
    | "category"
  >;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6 py-8 max-w-md">
      <div>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          {product.title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-lg text-gray-700">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
        <div
          className={`text-sm ${
            product.stock < 10 ? "text-red-600" : "text-green-600"
          }`}
        >
          {product.stock < 10 ? `Only ${product.stock} left` : "In Stock"}
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-gray-900">${product.price}</p>
          {product.discountPercentage > 0 && (
            <>
              <p className="text-lg text-gray-500 line-through">
                $
                {Math.round(
                  product.price / (1 - product.discountPercentage / 100)
                )}
              </p>
              <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      <p className="text-gray-600">{product.description}</p>

      <div className="space-y-1 pt-4">
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-sm text-gray-500">Brand: {product.brand}</p>
      </div>

      <button
        className="w-full rounded-lg border border-gray-900 bg-gray-900 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800"
        onClick={() => console.log("Added to cart")}
      >
        Add to Cart
      </button>
    </div>
  );
}
