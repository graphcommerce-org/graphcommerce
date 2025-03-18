function calculateBundleOptionValuePrice(
  item: NonNullable<ProductPageItem_BundleFragment['items']>[number],
  option: NonNullable<
    NonNullable<ProductPageItem_BundleFragment['items']>[number]['options']
  >[number],
  product: ProductPageItem_BundleFragment,
  discountPercent: number,
) {
  const { dynamic_price = false } = product
  const precentOff = item?.price_range.minimum_price.discount?.percent_off

  const regularPrice =
    (dynamic_price ? product?.price_range.minimum_price.final_price.value : price) ?? 0
  const finalPrice = regularPrice.value * (1 - discountPercent / 100)
  return { regularPrice, finalPrice }
}
