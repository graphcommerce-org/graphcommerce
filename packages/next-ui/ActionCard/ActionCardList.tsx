import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Alert } from '@mui/material'
import React from 'react'
import { isFragment } from 'react-is'
import { Button } from '../Button'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
import { iconChevronDown } from '../icons'
import type { ActionCardProps } from './ActionCard'
import { ActionCardLayout } from './ActionCardLayout'

type MultiSelect = {
  multiple: true
  collapse?: false
  value: (string | boolean | number | null)[]

  onChange?: (event: React.MouseEvent<HTMLElement>, value: MultiSelect['value']) => void
}
type Select = {
  multiple?: boolean
  value: string | boolean | number | null
  collapse?: boolean

  /** Value is null when deselected when not required */
  onChange?: (event: React.MouseEvent<HTMLElement>, value: Select['value'] | null) => void
}

export type ActionCardListProps<SelectOrMulti = MultiSelect | Select> = {
  showMoreAfter?: number
  children?: React.ReactNode
  required?: boolean
  error?: boolean
  errorMessage?: string
  sx?: SxProps<Theme>
} & SelectOrMulti &
  HoistedActionCardProps

function isMulti(props: ActionCardListProps): props is ActionCardListProps<MultiSelect> {
  return props.multiple === true
}

function isValueSelected(
  value: ActionCardProps['value'],
  candidate?: Select['value'] | MultiSelect['value'],
) {
  if (candidate === undefined) return false
  if (typeof value === 'boolean') return value
  if (Array.isArray(candidate)) return candidate.indexOf(value) >= 0
  return value === candidate
}

type HoistedActionCardProps = Pick<ActionCardProps, 'color' | 'variant' | 'size' | 'layout'>

const parts = ['root'] as const
const name = 'ActionCardList'
const { withState } = extendableComponent<HoistedActionCardProps, typeof name, typeof parts>(
  name,
  parts,
)

const isNotFrag = <T extends React.ReactElement>(el: T): el is T => !isFragment(el)

export const ActionCardList = React.forwardRef<HTMLDivElement, ActionCardListProps>(
  (props, ref) => {
    const {
      children,
      required,
      showMoreAfter = 1000000,
      error = false,
      errorMessage,
      size = 'medium',
      color = 'primary',
      variant = 'outlined',
      layout = 'list',
      collapse = false,
      sx = [],
    } = props

    const [show, setShow] = React.useState(false)

    const handleChange: ActionCardProps['onClick'] = isMulti(props)
      ? (event, v) => {
          const { onChange, value } = props
          const index = Boolean(value) && value?.indexOf(v)
          let newValue: typeof value
          if (value?.length && index !== false && index >= 0) {
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
      Pick<ActionCardProps, 'value' | 'selected' | 'disabled' | 'onClick' | 'error'> &
        HoistedActionCardProps
    >

    function isActionCardLike(el: React.ReactElement): el is ActionCardLike {
      const hasValue = (el as ActionCardLike).props.value

      if (process.env.NODE_ENV !== 'production') {
        if (hasValue === undefined) console.error(el, 'must be an instance of ActionCard')
      }
      return (el as ActionCardLike).props.value !== undefined
    }

    // Make sure the children are cardlike
    const childActionCards = React.Children.toArray(children)
      .filter(React.isValidElement)
      .filter(isActionCardLike)
      .filter((child) => {
        const notFrag = isNotFrag(child)
        if (process.env.NODE_ENV !== 'production') {
          if (!notFrag)
            console.error(
              "@graphcommerce/next-ui: The ActionCardList component doesn't accept a Fragment as a child. Consider providing an array instead",
            )
        }

        return notFrag
      })

    // Make sure the selected values is in the list of all possible values
    const value = childActionCards.find(
      // eslint-disable-next-line react/destructuring-assignment
      (child) => child.props.value === props.value && child.props.disabled !== true,
    )?.props.value

    const classes = withState({ size, color, variant, layout })

    return (
      <div>
        <ActionCardLayout sx={sx} className={classes.root} layout={layout} ref={ref} tabIndex={0}>
          {childActionCards.map((child, index) => {
            if (collapse && Boolean(value) && !isValueSelected(child.props.value, value))
              return null
            if (index && showMoreAfter && index + 1 > showMoreAfter && !show) return null
            return React.cloneElement(child, {
              onClick: handleChange,
              error,
              color,
              variant,
              size,
              layout,
              ...child.props,
              selected:
                child.props.selected === undefined
                  ? isValueSelected(child.props.value, value)
                  : child.props.selected,
            })
          })}
        </ActionCardLayout>

        {childActionCards.length > showMoreAfter && (
          <Button
            sx={{ width: 'fit-content' }}
            color='primary'
            variant='text'
            onClick={() => setShow(!show)}
          >
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

        {error && errorMessage && (
          <Alert
            severity='error'
            variant='standard'
            sx={(theme) => ({
              marginTop: theme.spacings.xxs,
            })}
          >
            {errorMessage}
          </Alert>
        )}
      </div>
    )
  },
)
