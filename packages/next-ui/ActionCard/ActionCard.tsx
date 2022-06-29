import { SxProps, ButtonBase, Box, Theme, ButtonProps, BoxProps } from '@mui/material'
import React, { FormEvent } from 'react'
import { extendableComponent, responsiveVal } from '../Styles'
import { Variants } from './ActionCardList'

function isButtonProps(props: ButtonProps<'div'> | BoxProps<'div'>): props is ButtonProps<'div'> {
  return props.onClick !== undefined
}

const RenderComponent = (props: ButtonProps<'div'> | BoxProps<'div'>) =>
  isButtonProps(props) ? <ButtonBase component='div' {...props} /> : <Box {...props} />

export type ActionCardProps = {
  variant?: Variants
  size?: 'large' | 'medium' | 'small'
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
  size?: 'large' | 'medium' | 'small'
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
    size = 'large',
  } = props

  const classes = withState({ hidden, disabled, selected, image: Boolean(image), variant, size })

  return (
    <RenderComponent
      className={classes.root}
      onClick={onClick && ((event) => onClick?.(event, value))}
      disabled={disabled}
      sx={[
        (theme) => ({
          '&.variantDefault': {
            py: theme.spacings.xxs,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },

          '&.variantOutlined': {
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
            backgroundColor: theme.palette.background.paper,
            border: `${responsiveVal(2, 3)} solid ${theme.palette.divider}`,
          },

          '&.sizeSmall': {
            display: 'flex',
            borderRadius: 2,
          },

          '&.sizeMedium': {
            borderRadius: 2,
          },

          '&.sizeLarge': {
            width: '100%',
            '&:not(:last-child)': {
              borderBottomColor: 'transparent',
            },
          },
          '&.selected': {
            border: `${responsiveVal(2, 3)} solid ${theme.palette.secondary.main} !important`,
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,
          },
        }),
        hidden && {
          display: 'none',
        },

        disabled &&
          ((theme) => ({
            background: theme.palette.background.default,
          })),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',

            justifyContent: 'space-between',
          }}
        >
          {image && (
            <Box
              className={classes.image}
              sx={{ display: 'flex', paddingRight: '15px', alignSelf: 'center' }}
            >
              {image}
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {title && (
              <Box className={classes.title} sx={{ typography: 'h6', number: 2 }}>
                {title}
              </Box>
            )}

            {details && (
              <Box
                className={classes.details}
                sx={{ gridArea: 'details', color: 'text.secondary' }}
              >
                {details}
              </Box>
            )}

            {secondaryAction && <Box className={classes.secondaryAction}>{secondaryAction}</Box>}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {action && (
            <Box className={classes.action} sx={{ marginBottom: '5px' }}>
              {!selected ? action : reset}
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
        </Box>

        {after && (
          <Box className={classes.after} sx={{ gridArea: 'after' }}>
            {after}
          </Box>
        )}
      </Box>
    </RenderComponent>
  )
}
