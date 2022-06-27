/* eslint-disable import/no-extraneous-dependencies */
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
    render: React.VFC<ActionCardItemRenderProps<T>>
  }

export function ActionCardListForm<T extends ActionCardItemBase>(
  props: ActionCardListFormProps<T>,
) {
  const { required, rules, items, render, control, name, errorMessage } = props
  const RenderItem = render as React.VFC<ActionCardItemRenderProps<ActionCardItemBase>>

  return (
    <Controller
      {...props}
      control={control}
      name={name}
      rules={{ required, ...rules, validate: (v) => (v ? true : errorMessage) }}
      render={({ field: { onChange, value }, fieldState, formState }) => (
        <ActionCardList
          required
          value={value}
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
              hidden={!!value && value !== item.value}
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
