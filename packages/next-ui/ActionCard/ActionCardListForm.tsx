/* eslint-disable import/no-extraneous-dependencies */
import { Controller, ControllerProps } from '@graphcommerce/react-hook-form'
import React, { MouseEventHandler } from 'react'
import { ActionCardProps } from './ActionCard'
import { ActionCardList, ActionCardListProps } from './ActionCardList'

export type ActionCardItemBase = Pick<ActionCardProps, 'value'>

export type ActionCardItemRenderProps<T> = ActionCardProps & {
  onReset: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLSpanElement>
} & T

export type ActionCardListFormProps<T extends ActionCardItemBase> = Omit<
  ActionCardListProps,
  'value' | 'error' | 'onChange' | 'children' | 'multiple'
> &
  Omit<ControllerProps<any>, 'render' | 'shouldUnregister'> & {
    items: T[]
    render: React.FC<ActionCardItemRenderProps<T>>
  }

export function ActionCardListForm<T extends ActionCardItemBase>(
  props: ActionCardListFormProps<T>,
) {
  const { required, rules, items, render, control, name, errorMessage, defaultValue, ...other } =
    props
  const RenderItem = render as React.FC<ActionCardItemRenderProps<ActionCardItemBase>>

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
              selected={value === item.value}
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
