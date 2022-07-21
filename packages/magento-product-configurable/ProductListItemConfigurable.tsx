import {
  ProductListItem,
  OverlayAreaKeys,
  ProductListItemProps,
  isFilterTypeEqual,
  useProductListParamsContext,
} from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemConfigurableFragment } from './ProductListItemConfigurable.gql'
import { SwatchList } from './SwatchList'

export type ProductListItemConfigurableActionProps = ProductListItemConfigurableFragment
export type ProdustListItemConfigurableProps = ProductListItemConfigurableFragment &
  ProductListItemProps & {
    Actions?: React.VFC<ProductListItemConfigurableActionProps>
    swatchLocations?: Record<OverlayAreaKeys, string[]>
  }

export function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const {
    Actions,
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

  return (
    <ProductListItem
      {...configurableProduct}
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
      {Actions && <Actions {...configurableProduct} />}
      {children}
    </ProductListItem>
  )
}
