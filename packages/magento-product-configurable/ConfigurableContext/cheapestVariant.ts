import { Variants } from '.'

export default function cheapestVariant(variants: Variants): Variants[0] {
  const cheapest = variants.reduce((prev, curr) =>
    (curr?.product?.price_range.minimum_price.final_price.value ?? 0) <
    (prev?.product?.price_range.minimum_price.final_price.value ?? 0)
      ? curr
      : prev,
  )
  return cheapest
}
