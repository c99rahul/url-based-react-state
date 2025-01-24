// ProductCard.tsx
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { getOriginalPrice } from "@/utils/calculatePrice";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountAmount = Math.round(product.discountPercentage);
  const hasDiscount = discountAmount > 0;
  const stockWarning = product.stock < 10;

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-gray-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-video w-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          {hasDiscount && (
            <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
              {discountAmount}% OFF
            </div>
          )}
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{product.brand}</p>
            <span className="text-sm text-gray-700">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>

          <h2 className="text-lg font-medium text-gray-900 group-hover:text-gray-600">
            {product.title}
          </h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                ${product.price}
              </p>
              {hasDiscount && (
                <p className="text-sm text-gray-500 line-through">
                  ${getOriginalPrice(product.price, product.discountPercentage)}
                </p>
              )}
            </div>
            {stockWarning && (
              <p className="text-sm text-red-600">Only {product.stock} left</p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
