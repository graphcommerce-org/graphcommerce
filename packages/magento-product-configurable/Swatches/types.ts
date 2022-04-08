import { MoneyProps } from '@graphcommerce/magento-store'
import { TypeRenderer } from '@graphcommerce/next-ui'
import { ContentOptions } from '../ConfigurableOptions/types'
import { ProductListItemConfigurableFragment } from '../ProductListItemConfigurable.gql'
import { SwatchDataFragment } from './SwatchData.gql'

type ConfigurableOption = NonNullable<
  NonNullable<ProductListItemConfigurableFragment['configurable_options']>[0]
>
export type ConfigurableOptionValue = NonNullable<NonNullable<ConfigurableOption['values']>[0]>

export type SwatchSize = 'small' | 'medium' | 'large'

export type SwatchDataProps = ConfigurableOptionValue & {
  size?: SwatchSize
  price?: MoneyProps
  content?: ContentOptions[]
}

export type SwatchTypeRenderer = TypeRenderer<SwatchDataFragment, SwatchDataProps>
