/* eslint-disable import/no-extraneous-dependencies */
import { Controller, ControllerProps } from '@graphcommerce/react-hook-form'
import React from 'react'
import { ActionCardProps } from './ActionCard'
import { ActionCardList, ActionCardListProps } from './ActionCardList'

export type ActionCardItemBase = Pick<ActionCardProps, 'value'>

export type ActionCardItemRenderer<T> = Pick<ActionCardProps, 'selected' | 'hidden' | 'value'> & {
  onReset: React.MouseEventHandler<HTMLButtonElement>
} & T

export type ActionCardListFormProps<T extends ActionCardItemBase> = Omit<
  ActionCardListProps,
  'value'
> &
  Omit<ControllerProps<any>, 'render'> & {
    items: T[]
    render: React.VFC<ActionCardItemRenderer<T>>
  }

export function ActionCardListForm<T extends ActionCardItemBase>(
  props: ActionCardListFormProps<T>,
) {
  const { required, rules, items, render, control, name, errorMessage } = props
  const RenderItem = render as React.VFC<ActionCardItemRenderer<ActionCardItemBase>>

  return (
    <Controller
      {...props}
      control={control}
      name={name}
      rules={{
        required,
        ...rules,
        validate: (v) => (v ? true : 'Please select a shipping address'),
      }}
      render={({ field: { onChange, value }, fieldState, formState }) => (
        <ActionCardList
          required
          value={value}
          onChange={(_, incomming) => onChange(incomming)}
          error={formState.isSubmitted && !!fieldState.error}
          errorMessage={errorMessage}
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
