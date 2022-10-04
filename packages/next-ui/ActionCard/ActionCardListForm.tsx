/* eslint-disable import/no-extraneous-dependencies */
import { Controller, ControllerProps } from '@graphcommerce/react-hook-form'
import React, { MouseEventHandler } from 'react'
import { ActionCardProps } from './ActionCard'
import { ActionCardList, ActionCardListProps } from './ActionCardList'

export type ActionCardItemBase = Pick<ActionCardProps, 'value'>

export type ActionCardItemRenderProps<T> = ActionCardProps & {
  onReset: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLSpanElement>
} & T

export type ActionCardListFormProps<A> = Omit<
  ActionCardListProps,
  'value' | 'error' | 'onChange' | 'children'
> &
  Omit<ControllerProps<any>, 'render' | 'shouldUnregister'> & {
    items: A[]
    render: React.FC<ActionCardItemRenderProps<A>>
  }

export function ActionCardListForm<T extends ActionCardItemBase>(
  props: ActionCardListFormProps<T>,
) {
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
    ...other
  } = props
  const RenderItem = render as React.FC<ActionCardItemRenderProps<ActionCardItemBase>>

  function onSelect(itemValue: number | string, selectValues: any) {
    return multiple
      ? Array.isArray(selectValues) && selectValues.some((selectValue) => selectValue === itemValue)
      : selectValues === itemValue
  }

  return (
    <Controller
      {...props}
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ required: errorMessage || required, ...rules }}
      render={({ field: { onChange, value, ref }, fieldState, formState }) => (
        <ActionCardList
          {...other}
          multiple={multiple}
          required={required}
          value={value}
          ref={ref}
          onChange={(_, incomming) => onChange(incomming)}
          error={formState.isSubmitted && !!fieldState.error}
          errorMessage={fieldState.error?.message}
        >
          {items.map((item) => (
            <RenderItem
              {...item}
              key={item.value}
              value={item.value}
              selected={onSelect(item.value, value)}
              onReset={(e) => {
                e.preventDefault()
                onChange(null)
              }}
            />
          ))}
        </ActionCardList>
      )}
    />
  )
}
