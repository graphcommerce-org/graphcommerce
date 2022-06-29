import { Alert, Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { isFragment } from 'react-is'
import { Size } from '../Layout/components/LayoutHeadertypes'
import { extendableComponent } from '../Styles/extendableComponent'

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

const parts = ['root'] as const
const name = 'ActionCardList'

export type Variants = 'outlined' | 'default'

type StateProps = {
  size?: 'large' | 'medium' | 'small'
}

export type ActionCardListProps<SelectOrMulti = MultiSelect | Select> = {
  size?: StateProps['size']
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

const { withState, selectors } = extendableComponent<StateProps, typeof name, typeof parts>(
  name,
  parts,
)

export const actionCardListSelectors = selectors

export function ActionCardList(props: ActionCardListProps) {
  const { children, required, value, error = false, errorMessage, size = 'large', sx = [] } = props
  const classes = withState({ size })

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
      className={classes.root}
      sx={[
        error &&
          ((theme) => ({
            '& .ActionCard-root': {
              borderLeftColor: 'error.main',
              borderRightColor: 'error.main',
              paddingLeft: theme.spacings.xs,
              paddingRight: theme.spacings.xs,
            },
            '& > div:first-of-type.ActionCard-root': {
              borderTop: 1,
              borderTopColor: 'error.main',
              paddingTop: theme.spacings.xxs,
            },
            '& > div:last-of-type.ActionCard-root': {
              borderBottom: 2,
              borderBottomColor: 'error.main',
              paddingBottom: theme.spacings.xxs,
            },
          })),
        size === 'small' &&
          ((theme) => ({
            display: 'flex',
            flexWrap: 'wrap',
            gridGap: theme.spacings.xxs,
          })),
        size === 'medium' &&
          ((theme) => ({
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: theme.spacings.xxs,
          })),
        size === 'large' && (() => ({})),
        {
          height: ' min-content',
        },
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
