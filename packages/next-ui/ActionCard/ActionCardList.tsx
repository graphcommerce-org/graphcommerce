import { Alert, Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { isFragment } from 'react-is'
import { extendableComponent } from '../Styles/extendableComponent'
import { ActionCardProps } from './ActionCard'

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

type MultiSelect = {
  multiple: true
  collapse?: false
  value: (string | number)[]

  onChange?: (event: React.MouseEvent<HTMLElement>, value: MultiSelect['value']) => void
}
type Select = {
  multiple?: false
  value: string | number
  collapse?: boolean

  /** Value is null when deselected when not required */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: Select['value'] | null) => void
}

type HoistedActionCardProps = Pick<ActionCardProps, 'color' | 'variant' | 'size' | 'layout'>

export type ActionCardListProps<SelectOrMulti = MultiSelect | Select> = {
  children?: React.ReactNode
  required?: boolean
  error?: boolean
  errorMessage?: string
  sx?: SxProps<Theme>
} & SelectOrMulti &
  HoistedActionCardProps

const parts = ['root'] as const
const name = 'ActionCardList'
const { withState, selectors } = extendableComponent<
  HoistedActionCardProps,
  typeof name,
  typeof parts
>(name, parts)

export const actionCardListSelectors = selectors

export const ActionCardList = React.forwardRef<any, ActionCardListProps>((props, ref) => {
  const {
    children,
    required,
    error = false,
    errorMessage,
    size = 'large',
    color = 'secondary',
    variant = 'outlined',
    layout = 'list',
    collapse = false,
    sx = [],
  } = props

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
    Pick<ActionCardProps, 'value' | 'selected' | 'disabled' | 'onClick'> & HoistedActionCardProps
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

  const classes = withState({ size, color, variant, layout })

  return (
    <Box
      className={classes.root}
      ref={ref}
      sx={[
        (theme) => ({
          '&.layoutList': {
            display: 'grid',
            height: 'min-content',
          },
          '&.layoutGrid': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: theme.spacings.xxs,
          },
          '&.layoutInline': {
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacings.xxs,
          },
        }),
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
              borderBottom: 1,
              borderBottomColor: 'error.main',
              paddingBottom: theme.spacings.xxs,
            },
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {childReactNodes.map((child) => {
        if (collapse && Boolean(value) && !isValueSelected(child.props.value, value)) return null
        return React.cloneElement(child, {
          onClick: handleChange,
          color: child.props.color ?? color,
          variant: child.props.variant ?? variant,
          size: child.props.size ?? size,
          layout: child.props.layout ?? layout,
          selected:
            child.props.selected === undefined
              ? isValueSelected(child.props.value, value)
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
})
