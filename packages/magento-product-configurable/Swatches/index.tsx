import { MoneyProps } from '@graphcommerce/magento-store'
import { TypeRenderer } from '@graphcommerce/next-ui'
import { ProductListItemConfigurableFragment } from '../ProductListItemConfigurable.graphql'
import { SwatchDataFragment } from './SwatchData.graphql'

type ConfigurableOption = NonNullable<
  NonNullable<ProductListItemConfigurableFragment['configurable_options']>[0]
>
export type ConfigurableOptionValue = NonNullable<NonNullable<ConfigurableOption['values']>[0]>

export type SwatchSize = 'small' | 'large'

export type SwatchDataProps = ConfigurableOptionValue & {
  size?: SwatchSize
  price?: MoneyProps
}

export type SwatchTypeRenderer = TypeRenderer<SwatchDataFragment, SwatchDataProps>
