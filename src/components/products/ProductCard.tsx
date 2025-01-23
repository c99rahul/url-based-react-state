import { Link } from "react-router-dom";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300">
      <Link
        to={`/product?id=${product.id}`}
        className="focus:outline-none focus:ring-1 focus:ring-gray-900"
      >
        <div className="relative aspect-video w-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          {Math.round(product.discountPercentage) > 0 && (
            <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              {Math.round(product.discountPercentage)}% OFF
            </div>
          )}
        </div>
        <div className="space-y-3 p-6">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{product.brand}</p>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-700">
                  ★ {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <h2 className="mt-1 text-lg font-medium text-gray-900 group-hover:text-gray-600">
              {product.title}
            </h2>
          </div>

          <p className="line-clamp-2 text-sm text-gray-600">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                ${product.price}
              </p>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-gray-500 line-through">
                  $
                  {Math.round(
                    product.price / (1 - product.discountPercentage / 100)
                  )}
                </p>
              )}
            </div>
            <div
              className={`text-sm ${
                product.stock < 10 ? "text-red-600" : "text-green-600"
              }`}
            >
              {product.stock < 10 && `Only ${product.stock} left`}
            </div>
          </div>

          <div className="pt-2 text-xs text-gray-500">
            Category: {product.category}
          </div>
        </div>
      </Link>
    </article>
  );
}
