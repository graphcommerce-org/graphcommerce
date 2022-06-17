import { Alert, Box, FormHelperText, SxProps, Theme } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { isFragment } from 'react-is'
import { AnimatedRow } from '../AnimatedRow/AnimatedRow'

type MultiSelect = {
  multiple: true
  value: string[]

  onChange?: (event: React.MouseEvent<HTMLElement>, value: string[]) => void
}
type Select = {
  multiple?: false
  value: string

  /** Value is null when deselected when not required */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: string | null) => void
}

export type ActionCardListProps<SelectOrMulti = MultiSelect | Select> = {
  children?: React.ReactNode
  required?: boolean
  error?: boolean
  errorMessage?: string
  sx?: SxProps<Theme>
} & SelectOrMulti

function isMulti(props: ActionCardListProps): props is ActionCardListProps<MultiSelect> {
  return props.multiple === true
}

function isValueSelected(value: string, candidate: string | string[]) {
  if (candidate === undefined || value === undefined) return false
  if (Array.isArray(candidate)) return candidate.indexOf(value) >= 0
  return value === candidate
}

export function ActionCardList(props: ActionCardListProps) {
  const { children, required, value, error = false, errorMessage, sx = [] } = props

  const handleChange = isMulti(props)
    ? (event: React.MouseEvent<HTMLElement, MouseEvent>, buttonValue: string) => {
        const { onChange } = props
        const index = Boolean(value) && value?.indexOf(buttonValue)
        let newValue: string[]

        if (Array.isArray(value) && value.length && index && index >= 0) {
          newValue = value.slice()
          newValue.splice(index, 1)
        } else {
          newValue = value ? [...value, buttonValue] : [buttonValue]
        }
        onChange?.(event, newValue)
      }
    : (event: React.MouseEvent<HTMLElement, MouseEvent>, buttonValue: string) => {
        const { onChange } = props

        if (value === buttonValue) return
        if (required) onChange?.(event, buttonValue)
        else onChange?.(event, value === buttonValue ? null : buttonValue)
      }

  return (
    <Box
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        error &&
          ((theme) => ({
            '& .ActionCard-root': {
              borderLeft: 2,
              borderRight: 2,
              borderLeftColor: 'error.main',
              borderRightColor: 'error.main',
              paddingLeft: theme.spacings.xs,
              paddingRight: theme.spacings.xs,
            },
            '& > div:first-of-type.ActionCard-root': {
              borderTop: 2,
              borderTopColor: 'error.main',
              paddingTop: theme.spacings.xxs,
            },
            '& > div:last-of-type.ActionCard-root': {
              borderBottom: 2,
              borderBottomColor: 'error.main',
              paddingBottom: theme.spacings.xxs,
            },
          })),
      ]}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "@graphcommerce/next-ui: The ActionCardList component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            )
          }
        }

        return React.cloneElement(child, {
          onClick: handleChange,
          selected:
            child.props.selected === undefined
              ? isValueSelected(child.props.value as string, value)
              : child.props.selected,
        })
      })}
      {error && (
        <Alert
          severity='error'
          variant='filled'
          sx={{ borderStartStartRadius: 0, borderStartEndRadius: 0 }}
        >
          {errorMessage}
        </Alert>
      )}
    </Box>
  )
}
