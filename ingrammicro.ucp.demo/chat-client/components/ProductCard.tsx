/*
 * Copyright 2026 UCP Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type React from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const FALLBACK_IMAGE = "/images/no_image.png";

/**
 * Safely resolves the display image URL from the product's image field.
 * The agent API may return the image as a string, a string[], or an object
 * with a `url` property. Falls back to a placeholder if no valid URL is found.
 */
function resolveImageUrl(
  image: string | string[] | { url?: string } | null | undefined,
): string {
  if (!image) return FALLBACK_IMAGE;
  if (typeof image === "string") return image || FALLBACK_IMAGE;
  if (Array.isArray(image)) {
    const first = image[0];
    if (!first) return FALLBACK_IMAGE;
    if (typeof first === "string") return first;
    if (typeof first === "object" && "url" in first && first.url) return first.url;
    return FALLBACK_IMAGE;
  }
  if (typeof image === "object" && "url" in image && image.url) return image.url;
  return FALLBACK_IMAGE;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isAvailable = product.offers?.availability?.includes("InStock") ?? false;
  const handleAddToCartClick = () => onAddToCart?.(product);
  const imageUrl = resolveImageUrl(product.image as string | string[] | { url?: string } | null);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex-shrink-0">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
        }}
      />
      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 truncate" title={product.description ?? ""}>
          {product.brand?.name ?? ""}
        </p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-gray-900">
            {product.offers?.priceCurrency === "EUR" ? "€" : "$"}
            {product.offers?.price ?? "—"}
          </p>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddToCartClick}
          disabled={!isAvailable || !onAddToCart}
          className="block w-full text-center bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add to Checkout
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

