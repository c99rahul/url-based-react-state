export const BASE_URL = "https://dummyjson.com";
export const PRODUCTS_URL = `${BASE_URL}/products`;
export const PRODUCTS_BY_CATEGORY_URL = `${PRODUCTS_URL}/category`;
export const PRODUCTS_CATEGORIES_URL = `${PRODUCTS_URL}/categories`;
export const PRODUCTS_PER_PAGE = 9;
export const PRODUCTS_TO_SKIP = 0;
export const SORT_OPTIONS = [
  { label: "Title (A-Z)", value: "title-asc" },
  { label: "Title (Z-A)", value: "title-desc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
  { label: "Rating (High to Low)", value: "rating-desc" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const STORE_NAME = "MyStore";
