/* eslint-disable import/no-extraneous-dependencies */
import { Controller, ControllerProps } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import React from 'react'
import { ActionCard, ActionCardProps } from './ActionCard'
import { ActionCardList, ActionCardListProps } from './ActionCardList'

export type ActionCardRenderProps = Pick<
  ActionCardProps,
  'action' | 'reset' | 'selected' | 'hidden' | 'value' | 'onClick' | 'onChange'
>

export type ActionCardItem = Omit<ActionCardProps, 'selected' | 'hidden' | 'onClick' | 'onChange'>

type ActionCardListFormProps = Omit<ActionCardListProps, 'value'> &
  Omit<ControllerProps<any>, 'render'> & {
    items: ActionCardItem[]
    render?: React.VFC<ActionCardRenderProps>
  }

export function ActionCardListForm(props: ActionCardListFormProps) {
  const { required, rules, items, render: RenderItem = ActionCard } = props

  return (
    <Controller
      {...props}
      rules={{ required, ...rules }}
      render={({ field: { onChange, value }, fieldState, formState }) => (
        <ActionCardList
          required
          value={value}
          onChange={(_, incomming) => onChange(incomming)}
          error={formState.isSubmitted && !!fieldState.error}
        >
          {items.map((item) => (
            <RenderItem
              {...item}
              key={item.value}
              value={item.value}
              selected={value === item.value}
              hidden={!!value && value !== item.value}
              action={
                typeof item.action !== 'undefined' ? (
                  item.action
                ) : (
                  <Button disableRipple variant='text' color='secondary'>
                    <Trans id='Select' />
                  </Button>
                )
              }
              reset={
                typeof item.reset !== 'undefined' ? (
                  item.reset
                ) : (
                  <Button
                    disableRipple
                    variant='text'
                    color='secondary'
                    onClick={(e) => {
                      e.preventDefault()
                      onChange(null)
                    }}
                  >
                    <Trans id='Change' />
                  </Button>
                )
              }
            />
          ))}
        </ActionCardList>
      )}
    />
  )
}
