export function getOriginalPrice(price: number, discountPercentage: number) {
  return Math.round(price * (100 / (100 - discountPercentage)));
}
