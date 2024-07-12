import {
  ProductListItem,
  OverlayAreaKeys,
  ProductListItemProps,
} from '@graphcommerce/magento-product'
import { SwatchList } from '../../SwatchList'
import { ProductListItemConfigurableFragment } from './ProductListItemConfigurable.gql'

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
      {children}
    </ProductListItem>
  )
}
