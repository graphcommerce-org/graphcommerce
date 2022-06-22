import { TypeRenderer } from '@graphcommerce/next-ui'
import { ActionCardItemRenderProps } from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { ProductListItemConfigurableFragment } from '../ProductListItemConfigurable.gql'
import { ConfigurableProductConfigurationsFragment } from '../graphql'
import { SwatchDataFragment } from './SwatchData.gql'

type ConfigurableOption = NonNullable<
  NonNullable<ProductListItemConfigurableFragment['configurable_options']>[0]
>
export type ConfigurableOptionValue = NonNullable<NonNullable<ConfigurableOption['values']>[0]>

export type SwatchSize = 'small' | 'medium' | 'large'

export type SwatchDataProps = ConfigurableOptionValue & {
  size?: SwatchSize
}

export type SwatchTypeRenderer = TypeRenderer<
  SwatchDataFragment,
  ConfigurableOptionsActionCardProps
>

export type ConfigurableOptionsActionCardProps = ActionCardItemRenderProps<
  | NonNullable<
      NonNullable<
        NonNullable<ConfigurableProductConfigurationsFragment['configurable_options']>[0]
      >['values']
    >[0]
  | null
  | undefined
>
