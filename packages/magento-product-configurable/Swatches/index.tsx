import { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { ProductListItemConfigurableFragment } from '../ProductListItemConfigurable.gql'
import { SwatchDataFragment } from './SwatchData.gql'

type ConfigurableOption = NonNullable<
  NonNullable<ProductListItemConfigurableFragment['configurable_options']>[0]
>
export type ConfigurableOptionValue = NonNullable<ConfigurableOption['values']>[0]

export type SwatchDataProps = ConfigurableOptionValue & { size?: 'small' }

export type SwatchTypeRenderer = TypeRenderer<SwatchDataFragment, SwatchDataProps>
