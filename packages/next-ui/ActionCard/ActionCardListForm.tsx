/* eslint-disable import/no-extraneous-dependencies */
import { Theme } from '@emotion/react'
import { Controller, ControllerProps } from '@graphcommerce/react-hook-form'
import { SxProps } from '@mui/material'
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
  } & {
    sx?: SxProps<Theme>
  }

export function ActionCardListForm<T extends ActionCardItemBase>(
  props: ActionCardListFormProps<T>,
) {
  const { required, rules, items, render, control, name, errorMessage, sx } = props
  const RenderItem = render as React.VFC<ActionCardItemRenderProps<ActionCardItemBase>>

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
          onChange={(_, incomming) => {
            onChange(incomming)
          }}
          error={formState.isSubmitted && !!fieldState.error}
          errorMessage={errorMessage}
          sx={sx}
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
