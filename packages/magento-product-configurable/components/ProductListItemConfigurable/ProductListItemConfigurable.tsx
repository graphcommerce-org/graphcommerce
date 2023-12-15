import { useQuery } from '@graphcommerce/graphql'
import {
  ProductListItem,
  OverlayAreaKeys,
  ProductListItemProps,
  useProductListParamsContext,
  isFilterTypeEqual,
} from '@graphcommerce/magento-product'
import { SwatchList } from '../../SwatchList'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { GetConfigurableVariantsDocument } from '../../graphql/GetConfigurableVariants.gql'
import { ProductListItemConfigurableFragment } from './ProductListItemConfigurable.gql'

export type ProductListItemConfigurableActionProps = ProductListItemConfigurableFragment & {
  variant?: NonNullable<ConfigurableOptionsFragment['variants']>[0]
}

export type ProdustListItemConfigurableProps = ProductListItemConfigurableFragment &
  ProductListItemProps & {
    swatchLocations?: Partial<Record<OverlayAreaKeys, string[]>>
  }

export function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const {
    configurable_options,
    children,
    swatchLocations = { bottomLeft: [], bottomRight: [], topLeft: [], topRight: [] },
    bottomLeft,
    bottomRight,
    topLeft,
    topRight,
    ...configurableProduct
  } = props
  const { params } = useProductListParamsContext()

  const swatches = ['dominant_color', 'print_pattern_swatch']

  const configurableItemVariants = useQuery(GetConfigurableVariantsDocument, {
    variables: { sku: configurableProduct.sku ?? '' },
    skip: !configurable_options?.some(
      (option) => option?.attribute_code && swatches.includes(option.attribute_code),
    ),
  }).data?.products?.items?.[0]

  if (!configurableProduct.sku) return false

  const variants =
    configurableItemVariants?.__typename === 'ConfigurableProduct'
      ? configurableItemVariants.variants
      : []

  const options: [string, string[]][] =
    configurable_options
      ?.filter(
        (option) =>
          option?.attribute_code &&
          params.filters[option.attribute_code] &&
          isFilterTypeEqual(params.filters[option.attribute_code]),
      )
      .map((option) => {
        const filter = params.filters[option?.attribute_code ?? '']
        return [option?.attribute_code ?? '', (filter?.in as string[]) ?? []]
      }) ?? []

  const selected = {}

  options.forEach(([attr, values]) => {
    if (!selected[attr]) selected[attr] = values
  })

  const matchingVariants = variants?.filter(
    (variant) =>
      variant?.attributes?.filter(
        (attribute) =>
          selected[attribute?.code ?? ''] !== undefined &&
          selected[attribute?.code ?? ''].includes(String(attribute?.value_index)),
      ).length,
  )

  return (
    <ProductListItem
      {...configurableProduct}
      small_image={matchingVariants?.[0]?.product?.small_image ?? configurableProduct.small_image}
      topLeft={
        <>
          {topLeft}
          <SwatchList
            attributes={swatchLocations.topLeft}
            configurable_options={configurable_options}
          />
        </>
      }
      topRight={
        <>
          {topRight}
          <SwatchList
            attributes={swatchLocations.topRight}
            configurable_options={configurable_options}
          />
        </>
      }
      bottomLeft={
        <>
          {bottomLeft}
          <SwatchList
            attributes={swatchLocations.bottomLeft}
            configurable_options={configurable_options}
          />
        </>
      }
      bottomRight={
        <>
          {bottomRight}
          <SwatchList
            attributes={swatchLocations.bottomRight}
            configurable_options={configurable_options}
          />
        </>
      }
    >
      {children}
    </ProductListItem>
  )
}
