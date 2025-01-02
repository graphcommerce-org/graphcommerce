import type {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from '@graphcommerce/react-hook-form'

export type BaseControllerProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  control?: Control<TFieldValues>
  rules?: Omit<
    RegisterOptions<NoInfer<TFieldValues>, FieldPath<TFieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  shouldUnregister?: boolean
  defaultValue?: FieldPathValue<NoInfer<TFieldValues>, FieldPath<TFieldValues>>
  disabled?: boolean
}

type BaseControllerPropsKeys = keyof BaseControllerProps

export type FieldElementProps<
  TFieldValues extends FieldValues,
  BaseTypes = Record<string, unknown>,
> = BaseControllerProps<TFieldValues> & Omit<BaseTypes, BaseControllerPropsKeys>
