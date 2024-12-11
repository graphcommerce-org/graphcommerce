import type { ActionCardListProps, ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCardList } from '@graphcommerce/next-ui'
import type { ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import type { MouseEventHandler } from 'react'
import React, { useCallback } from 'react'

export type ActionCardItemBase = Pick<ActionCardProps, 'value'>

export type ActionCardRequireOptionSelection = { requireOptionSelection?: boolean }

export type ActionCardItemRenderProps<T> = ActionCardProps & {
  onReset: MouseEventHandler<HTMLElement>
} & T

export type ActionCardListFormProps<A, F extends FieldValues = FieldValues> = Omit<
  ActionCardListProps,
  'value' | 'error' | 'onChange' | 'children'
> &
  Omit<ControllerProps<F>, 'render'> & {
    items: A[]
    render: React.FC<ActionCardItemRenderProps<A>>
  } & ActionCardRequireOptionSelection

export function ActionCardListForm<
  T extends ActionCardItemBase,
  F extends FieldValues = FieldValues,
>(props: ActionCardListFormProps<T, F>) {
  const {
    required,
    rules,
    items,
    render,
    control,
    name,
    errorMessage,
    defaultValue,
    multiple,
    disabled,
    shouldUnregister,
    requireOptionSelection,
    ...other
  } = props
  const RenderItem = render as React.FC<ActionCardItemRenderProps<ActionCardItemBase>>

  const onSelect = useCallback(
    (itemValue: unknown, selectValues: unknown) =>
      multiple
        ? Array.isArray(selectValues) &&
          selectValues.some((selectValue) => selectValue === itemValue)
        : selectValues === itemValue,
    [multiple],
  )

  const {
    field: { onChange, value, ref },
    fieldState,
    formState,
  } = useController({
    ...props,
    control,
    name,
    defaultValue,
    rules: { required, ...rules },
    disabled,
    shouldUnregister,
  })

  const handleReset = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      if (!requireOptionSelection) onChange(null)
    },
    [onChange, requireOptionSelection],
  )

  return (
    <ActionCardList
      {...other}
      multiple={multiple}
      required={required}
      value={value}
      ref={ref}
      onChange={(_, incoming) => onChange(incoming)}
      error={formState.isSubmitted && !!fieldState.error}
      errorMessage={fieldState.error?.message}
    >
      {items.map((item) => (
        <RenderItem
          {...item}
          key={`${item.value}`}
          value={item.value}
          selected={onSelect(item.value, value)}
          onReset={handleReset}
        />
      ))}
    </ActionCardList>
  )
}
