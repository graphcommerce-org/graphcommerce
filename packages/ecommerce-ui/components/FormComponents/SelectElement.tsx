import type { FieldValues } from '@graphcommerce/react-hook-form'
import type { TextFieldProps } from '@mui/material'
import { MenuItem } from '@mui/material'
import { TextFieldElement, type TextFieldElementProps } from './TextFieldElement'

type OptionBase = { id: string | number; label: string | number }

type AdditionalProps<O extends OptionBase = OptionBase> = { options: O[] }

export type SelectElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TOption extends OptionBase = OptionBase,
> = Omit<TextFieldElementProps<TFieldValues>, 'select'> & AdditionalProps<TOption>

type SelectElementComponent = <TFieldValues extends FieldValues>(
  props: SelectElementProps<TFieldValues>,
) => React.ReactNode

/** @public */
function SelectElementBase(props: SelectElementProps): JSX.Element {
  const { options } = props as AdditionalProps
  const { SelectProps } = props as TextFieldProps

  const isNativeSelect = !!SelectProps?.native
  const ChildComponent = isNativeSelect ? 'option' : MenuItem

  return (
    <TextFieldElement {...props} select>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      {isNativeSelect && <option />}
      {options.map((item) => (
        <ChildComponent key={item.id} value={item.id}>
          {item.label}
        </ChildComponent>
      ))}
    </TextFieldElement>
  )
}

export const SelectElement = SelectElementBase as SelectElementComponent
