import { SxProps, ButtonBase, Box, Theme, ButtonProps, BoxProps } from '@mui/material'
import React, { FormEvent } from 'react'
import { extendableComponent } from '../Styles'

function isButtonProps(props: ButtonProps<'div'> | BoxProps<'div'>): props is ButtonProps<'div'> {
  return props.onClick !== undefined
}

const RenderComponent = (props: ButtonProps<'div'> | BoxProps<'div'>) =>
  isButtonProps(props) ? <ButtonBase component='div' {...props} /> : <Box {...props} />

export type ActionCardProps = {
  variant?: 'outlined' | 'default'
  sx?: SxProps<Theme>
  title?: string | React.ReactNode
  image?: React.ReactNode
  action?: React.ReactNode
  details?: React.ReactNode
  price?: React.ReactNode
  after?: React.ReactNode
  secondaryAction?: React.ReactNode
  onClick?: (e: FormEvent<HTMLElement>, v: string | number) => void
  selected?: boolean
  hidden?: boolean
  value: string | number
  reset?: React.ReactNode
  disabled?: boolean
}

const parts = [
  'root',
  'image',
  'title',
  'action',
  'details',
  'price',
  'after',
  'secondaryAction',
  'reset',
] as const
const name = 'ActionCard'

type StateProps = {
  variant?: 'outlined' | 'default'
  selected: boolean
  hidden: boolean
  disabled: boolean
  image: boolean
}

const { withState, selectors } = extendableComponent<StateProps, typeof name, typeof parts>(
  name,
  parts,
)

export const actionCardSelectors = selectors

export function ActionCard(props: ActionCardProps) {
  const {
    title,
    image,
    action,
    details,
    price,
    after,
    secondaryAction,
    sx = [],
    onClick,
    value,
    selected = false,
    hidden = false,
    reset,
    disabled = false,
    variant = 'default',
  } = props

  const classes = withState({ hidden, disabled, selected, image: Boolean(image), variant })

  return (
    <RenderComponent
      className={classes.root}
      onClick={onClick && ((event) => onClick?.(event, value))}
      disabled={disabled}
      sx={[
        (theme) => ({
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'min-content auto auto',
          gridTemplateAreas: `
            "image title action"
            "image details ${price ? 'price' : 'details'}"
            "image secondaryAction additionalDetails"
            "after after after"
          `,
          justifyContent: 'unset',
          typography: 'body1',
          columnGap: theme.spacings.xxs,

          '&.variantDefault': {
            py: theme.spacings.xxs,
            borderBottom: `1px solid ${theme.palette.divider}`,
            '&:last-of-type': {
              // borderBottom: 'none',
            },
          },
          '&+ActionCard-root': {},
          '&.variantContained': {
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderBottomColor: `transparent`,
            '&:first-of-type': {
              borderTopLeftRadius: theme.shape.borderRadius,
              borderTopRightRadius: theme.shape.borderRadius,
            },
            '&:last-of-type': {
              borderBottomLeftRadius: theme.shape.borderRadius,
              borderBottomRightRadius: theme.shape.borderRadius,
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
          },
          '&.variantContained.selected:not(.disabled)': {
            border: `2px solid ${theme.palette.secondary.main} !important`,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius,
            padding: `calc(${theme.spacings.xxs} - 1) calc(${theme.spacings.xs} - 1)`,
          },
          '&:not(.image)': {
            gridTemplateColumns: 'auto auto',
            gridTemplateAreas: `
              "title action"
              "details ${price ? 'price' : 'details'}"
              "secondaryAction additionalDetails"
              "after after"
            `,
          },
          '&.hidden': {
            display: 'none',
          },
          '&.disabled': {
            background: theme.palette.background.default,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {image && (
        <Box className={classes.image} sx={{ gridArea: 'image', display: 'flex' }}>
          {image}
        </Box>
      )}
      {title && (
        <Box
          className={classes.title}
          sx={{ gridArea: 'title', display: 'flex', typography: 'h6' }}
        >
          {title}
        </Box>
      )}
      {action && (
        <Box className={classes.action} sx={{ gridArea: 'action', textAlign: 'right' }}>
          {!selected ? action : reset}
        </Box>
      )}
      {details && (
        <Box className={classes.details} sx={{ gridArea: 'details', color: 'text.secondary' }}>
          {details}
        </Box>
      )}

      {price && !disabled && (
        <Box
          className={classes.price}
          sx={{ gridArea: 'price', textAlign: 'right', typography: 'h5' }}
        >
          {price}
        </Box>
      )}

      {secondaryAction && (
        <Box className={classes.secondaryAction} sx={{ gridArea: 'secondaryAction' }}>
          {secondaryAction}
        </Box>
      )}
      {after && (
        <Box className={classes.after} sx={{ gridArea: 'after' }}>
          {after}
        </Box>
      )}
    </RenderComponent>
  )
}
