import type { PriceTypeEnum } from '@graphcommerce/graphql-mesh'
import type { Simplify } from 'type-fest'
import type { CustomizableAreaOptionFragment } from './CustomizableAreaOption.gql'
import type { CustomizableCheckboxOptionFragment } from './CustomizableCheckboxOption.gql'
import type { CustomizableDateOptionFragment } from './CustomizableDateOption.gql'
import type { CustomizableDropDownOptionFragment } from './CustomizableDropDownOption.gql'
import type { CustomizableFieldOptionFragment } from './CustomizableFieldOption.gql'
import type { CustomizableFileOptionFragment } from './CustomizableFileOption.gql'
import type { CustomizableMultipleOptionFragment } from './CustomizableMultipleOption.gql'
import type { CustomizableRadioOptionFragment } from './CustomizableRadioOption.gql'
import type { ProductCustomizable_SimpleProduct_Fragment } from './ProductCustomizable.gql'

export type CustomizableProductOptionBase =
  | {
      price?: number | null | undefined
      price_type?: PriceTypeEnum | null | undefined
      uid?: string | null | undefined
    }
  | undefined
  | null

export type AnyOption = NonNullable<
  NonNullable<ProductCustomizable_SimpleProduct_Fragment['options']>[number]
>

export type OptionValueSelector = {
  [T in AnyOption as T['__typename']]: (
    option: T,
  ) => CustomizableProductOptionBase | CustomizableProductOptionBase[]
}

type MissingOptionValueSelectors = Omit<
  OptionValueSelector,
  keyof typeof productCustomizableSelectors
>
type DefinedOptionValueSelectors = Partial<
  Pick<OptionValueSelector, keyof typeof productCustomizableSelectors>
>

type Selectors = Simplify<
  keyof MissingOptionValueSelectors extends never
    ? (MissingOptionValueSelectors & DefinedOptionValueSelectors) | undefined
    : MissingOptionValueSelectors & DefinedOptionValueSelectors
>

export const productCustomizableSelectors = {
  CustomizableAreaOption: (o: CustomizableAreaOptionFragment) => o.areaValue,
  CustomizableCheckboxOption: (o: CustomizableCheckboxOptionFragment) => o.checkboxValue,
  CustomizableFileOption: (o: CustomizableFileOptionFragment) => o.fileValue,
  CustomizableDateOption: (o: CustomizableDateOptionFragment) => o.dateValue,
  CustomizableDropDownOption: (o: CustomizableDropDownOptionFragment) => o.dropdownValue,
  CustomizableFieldOption: (o: CustomizableFieldOptionFragment) => o.fieldValue,
  CustomizableMultipleOption: (o: CustomizableMultipleOptionFragment) => o.multipleValue,
  CustomizableRadioOption: (o: CustomizableRadioOptionFragment) => o.radioValue,
}

export type SelectorsProp = keyof MissingOptionValueSelectors extends never
  ? { selectors?: Selectors }
  : { selectors: Selectors }
