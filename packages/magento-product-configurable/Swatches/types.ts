import type { MoneyProps } from '@graphcommerce/magento-store'
import type { TypeRenderer } from '@graphcommerce/next-ui'
import type { ProductListItemConfigurableFragment } from '../components/ProductListItemConfigurable/ProductListItemConfigurable.gql'
import type { SwatchDataFragment } from './SwatchData.gql'

type ConfigurableOption = NonNullable<
  NonNullable<ProductListItemConfigurableFragment['configurable_options']>[0]
>
export type ConfigurableOptionValue = NonNullable<NonNullable<ConfigurableOption['values']>[0]>

export type SwatchSize = 'small' | 'medium' | 'large'

export type SwatchDataProps = ConfigurableOptionValue & {
  size?: SwatchSize
  price?: MoneyProps
}

export type SwatchTypeRenderer = TypeRenderer<SwatchDataFragment, SwatchDataProps>
