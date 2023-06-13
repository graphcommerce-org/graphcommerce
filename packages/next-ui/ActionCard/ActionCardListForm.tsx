/* eslint-disable import/no-extraneous-dependencies */
import { iconChevronDown, IconSvg } from '@graphcommerce/next-ui'
import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import React, { MouseEventHandler } from 'react'
import { Button } from '../Button'
import { ActionCardProps } from './ActionCard'
import { ActionCardList, ActionCardListProps } from './ActionCardList'

export type ActionCardItemBase = Pick<ActionCardProps, 'value'>

export type ActionCardItemRenderProps<T> = ActionCardProps & {
  onReset: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLSpanElement>
} & T

export type ActionCardListFormProps<A, F extends FieldValues = FieldValues> = Omit<
  ActionCardListProps,
  'value' | 'error' | 'onChange' | 'children'
> &
  Omit<ControllerProps<F>, 'render'> & {
    items: A[]
    render: React.FC<ActionCardItemRenderProps<A>>
  }

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
    ...other
  } = props
  const RenderItem = render as React.FC<ActionCardItemRenderProps<ActionCardItemBase>>
  const [show, setShow] = React.useState(false)
  const showMoreAfter = 4

  function onSelect(itemValue: unknown, selectValues: unknown) {
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
        <>
          <ActionCardList
            {...other}
            multiple={multiple}
            required={required}
            value={value}
            ref={ref}
            onChange={(_, incomming) => onChange(incomming)}
            error={formState.isSubmitted && !!fieldState.error}
            errorMessage={fieldState.error?.message}
            show={show}
            showMoreAfter={showMoreAfter}
          >
            {items.map((item, index) => (
              <RenderItem
                {...item}
                key={item.value ?? ''}
                value={item.value}
                selected={onSelect(item.value, value)}
                onReset={(e) => {
                  e.preventDefault()
                  onChange(null)
                }}
                index={index}
                show={show}
                showMoreAfter={showMoreAfter}
              />
            ))}
          </ActionCardList>
          {items.length > showMoreAfter && (
            <Button color='primary' variant='text' onClick={() => setShow(!show)}>
              {!show ? <Trans id='More options' /> : <Trans id='Less options' />}{' '}
              <IconSvg
                sx={{
                  transform: show ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                src={iconChevronDown}
              />
            </Button>
          )}
        </>
      )}
    />
  )
}
