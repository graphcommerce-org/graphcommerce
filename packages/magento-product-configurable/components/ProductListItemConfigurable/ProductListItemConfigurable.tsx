import {
  ProductListItem,
  OverlayAreaKeys,
  ProductListItemProps,
  useProductListParamsContext,
  isFilterTypeEqual,
} from '@graphcommerce/magento-product'
import { SwatchList } from '../../SwatchList'
import { ProductListItemConfigurableFragment } from './ProductListItemConfigurable.gql'

export type ProductListItemConfigurableActionProps = ProductListItemConfigurableFragment

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

  // const matchingVariants = variants?.filter(
  //   (variant) =>
  //     variant?.attributes?.filter(
  //       (attribute) =>
  //         selected[attribute?.code ?? ''] !== undefined &&
  //         selected[attribute?.code ?? ''].includes(String(attribute?.value_index)),
  //     ).length,
  // )

  return (
    <ProductListItem
      {...configurableProduct}
      small_image={configurableProduct.small_image}
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
