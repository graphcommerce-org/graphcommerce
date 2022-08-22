import { Alert, Box, FormHelperText } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { isFragment } from 'react-is'
import { AnimatedRow } from '../AnimatedRow/AnimatedRow'
import { ActionCardProps } from './ActionCard'

type MultiSelect = {
  multiple: true
  value: (string | number)[]

  onChange?: (event: React.MouseEvent<HTMLElement>, value: MultiSelect['value']) => void
}
type Select = {
  multiple?: false
  value: string | number

  /** Value is null when deselected when not required */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: Select['value'] | null) => void
}

export type ActionCardListProps<SelectOrMulti = MultiSelect | Select> = {
  children?: React.ReactNode
  required?: boolean
  error?: boolean
  errorMessage?: string
} & SelectOrMulti

function isMulti(props: ActionCardListProps): props is ActionCardListProps<MultiSelect> {
  return props.multiple === true
}

function isValueSelected(
  value: ActionCardProps['value'],
  candidate?: Select['value'] | MultiSelect['value'],
) {
  if (candidate === undefined) return false
  if (Array.isArray(candidate)) return candidate.indexOf(value) >= 0
  return value === candidate
}

export const ActionCardList = React.forwardRef<HTMLDivElement, ActionCardListProps>(
  (props, ref) => {
    const { children, required, error = false, errorMessage } = props

    const handleChange: ActionCardProps['onClick'] = isMulti(props)
      ? (event, v) => {
          const { onChange, value } = props
          const index = Boolean(value) && value?.indexOf(v)
          let newValue: typeof value

          if (value.length && index && index >= 0) {
            newValue = value.slice()
            newValue.splice(index, 1)
          } else {
            newValue = value ? [...value, v] : [v]
          }
          onChange?.(event, newValue)
        }
      : (event, v) => {
          const { onChange, value } = props

          if (value !== v) {
            if (required) onChange?.(event, v)
            else onChange?.(event, value === v ? null : v)
          }
        }

    type ActionCardLike = React.ReactElement<
      Pick<ActionCardProps, 'value' | 'selected' | 'disabled' | 'onClick' | 'hidden'>
    >
    function isActionCardLike(el: React.ReactElement): el is ActionCardLike {
      const hasValue = (el as ActionCardLike).props.value

      if (process.env.NODE_ENV !== 'production') {
        if (!hasValue) console.error(el, `must be an instance of ActionCard`)
      }
      return (el as ActionCardLike).props.value !== undefined
    }

    // Make sure the children are cardlike
    const childReactNodes = React.Children.toArray(children)
      .filter(React.isValidElement)
      .filter(isActionCardLike)
      .filter((child) => {
        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child))
            console.error(
              [
                "@graphcommerce/next-ui: The ActionCardList component doesn't accept a Fragment as a child.",
                'Consider providing an array instead',
              ].join('\n'),
            )
        }

        return !isFragment(child)
      })

    // Make sure the selected values is in the list of all possible values
    const value = childReactNodes.find(
      // eslint-disable-next-line react/destructuring-assignment
      (child) => child.props.value === props.value && child.props.disabled !== true,
    )?.props.value

    return (
      <Box
        ref={ref}
        sx={[
          error &&
            ((theme) => ({
              '& .ActionCard-root': {
                borderLeft: 2,
                borderRight: 2,
                borderLeftColor: 'error.main',
                borderRightColor: 'error.main',
              },
              '& > div:first-of-type.ActionCard-root': {
                borderTop: 2,
                borderTopColor: 'error.main',
              },
              '& > div:last-of-type.ActionCard-root': {
                borderBottom: 2,
                borderBottomColor: 'error.main',
              },
            })),
        ]}
      >
        {childReactNodes.map((child) =>
          React.cloneElement(child, {
            onClick: handleChange,
            hidden: !!value && value !== child.props.value,
            selected:
              child.props.selected === undefined
                ? isValueSelected(child.props.value, value)
                : child.props.selected,
          }),
        )}
        {error && (
          <Box component='span'>
            <Alert
              severity='error'
              variant='standard'
              sx={(theme) => ({
                marginTop: 0.5,
                borderStartStartRadius: 0,
                borderStartEndRadius: 0,
                borderRadius: theme.shape.borderRadius * 1,
              })}
            >
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Box>
    )
  },
)
