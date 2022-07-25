import { MoneyProps } from '@graphcommerce/magento-store'
import { TypeRenderer } from '@graphcommerce/next-ui'
import { ProductListItemConfigurableFragment } from '../components/ProductListItemConfigurable/ProductListItemConfigurable.gql'
import { SwatchDataFragment } from './SwatchData.gql'

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
