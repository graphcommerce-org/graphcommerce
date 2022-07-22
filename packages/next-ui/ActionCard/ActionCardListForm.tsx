import { Controller, ControllerProps } from '@graphcommerce/react-hook-form'
import React, { MouseEventHandler } from 'react'
import { ActionCardProps } from './ActionCard'
import { ActionCardList, ActionCardListProps } from './ActionCardList'

export type ActionCardItemBase = Pick<ActionCardProps, 'value'>

export type ActionCardItemRenderProps<T> = Pick<
  ActionCardProps,
  'selected' | 'hidden' | 'value'
> & {
  onReset: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLSpanElement>
} & T

export type ActionCardListFormProps<T extends ActionCardItemBase> = Omit<
  ActionCardListProps,
  'value'
> &
  Omit<ControllerProps<any>, 'render'> & {
    items: T[]
    render: React.FC<ActionCardItemRenderProps<T>>
  }

export function ActionCardListForm<T extends ActionCardItemBase>(
  props: ActionCardListFormProps<T>,
) {
  const { required, rules, items, render, control, name, errorMessage, size, sx } = props
  const RenderItem = render as React.FC<ActionCardItemRenderProps<ActionCardItemBase>>

  return (
    <Controller
      {...props}
      control={control}
      name={name}
      rules={{ required: errorMessage, ...rules }}
      render={({ field: { onChange, value, onBlur, ref }, fieldState, formState }) => (
        <ActionCardList
          required={required}
          value={value}
          ref={ref}
          onChange={(_, incomming) => onChange(incomming)}
          error={formState.isSubmitted && !!fieldState.error}
          errorMessage={fieldState.error?.message}
          size={size}
        >
          {items.map((item) => (
            <RenderItem
              {...item}
              key={item.value}
              value={item.value}
              selected={value === item.value}
              hidden={!!value && value !== item.value}
              size={size}
              onReset={(e) => {
                e.preventDefault()
                onChange(null)
              }}
              sx={sx}
            />
          ))}
        </ActionCardList>
      )}
    />
  )
}
