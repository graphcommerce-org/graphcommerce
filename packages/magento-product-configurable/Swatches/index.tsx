import { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { ProductListItemConfigurableFragment } from '../ProductListItemConfigurable.gql'

type ConfigurableOption = NonNullable<
  NonNullable<ProductListItemConfigurableFragment['configurable_options']>[0]
>
export type ConfigurableOptionValue = NonNullable<ConfigurableOption['values']>[0]

type SwatchData = NonNullable<NonNullable<ConfigurableOptionValue>['swatch_data']>

export type SwatchTypeRenderer = TypeRenderer<
  SwatchData,
  { selected?: boolean } & ConfigurableOptionValue
>
