import { SxProps, ButtonBase, Box, Theme, ButtonProps, BoxProps } from '@mui/material'
import React, { FormEvent } from 'react'
import { extendableComponent, responsiveVal } from '../Styles'

type Variants = 'outlined' | 'default'
type Size = 'large' | 'medium' | 'small'

function isButtonProps(props: ButtonProps<'div'> | BoxProps<'div'>): props is ButtonProps<'div'> {
  return props.onClick !== undefined
}

const RenderComponent = (props: ButtonProps<'div'> | BoxProps<'div'>) =>
  isButtonProps(props) ? <ButtonBase component='div' {...props} /> : <Box {...props} />

export type ActionCardProps = {
  variant?: Variants
  size?: Size
  sx?: SxProps<Theme>
  title?: string | React.ReactNode
  image?: React.ReactNode
  action?: React.ReactNode
  details?: React.ReactNode
  price?: React.ReactNode
  after?: React.ReactNode
  secondaryAction?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLElement>, value: string | number) => void
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
  variant?: Variants
  size?: Size
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
          '&.sizeSmall': {
            padding: `5px 10px`,
            display: 'flex',
            typography: 'body2',
          },

          '&.sizeMedium': {
            padding: `10px 12px`,
            typography: 'body2',
          },

          '&.sizeLarge': {
            padding: `${theme.spacings.xxs} ${theme.spacings.xs}`,

            width: '100%',
            '&:not(:last-child)': {
              borderBottomColor: 'transparent',
            },
          },

          '&.variantDefault': {
            borderBottom: `2px solid ${theme.palette.divider}`,

            '&:not(:last-child)': {
              borderBottom: `2px solid ${theme.palette.divider}`,
            },
            '&.selected': {
              borderBottom: `2px solid ${theme.palette.secondary.main}`,
              backgroundColor: `${theme.palette.secondary.main}10`,
            },
          },

          '&.variantOutlined': {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            '&.selected': {
              border: `1px solid ${theme.palette.secondary.main} !important`,
            },
          },

          '&.variantOutlined.sizeLarge': {
            '&:first-of-type': {
              borderTopLeftRadius: theme.shape.borderRadius * 1.5,
              borderTopRightRadius: theme.shape.borderRadius * 1.5,
            },
            '&:last-of-type': {
              borderBottomLeftRadius: theme.shape.borderRadius * 1.5,
              borderBottomRightRadius: theme.shape.borderRadius * 1.5,
            },
          },

          '&.variantOutlined:not(.sizeLarge)': {
            borderRadius: 1,
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
              <Box
                className={classes.title}
                sx={{
                  typography: 'subtitle2',
                  '&.sizeMedium': { typographty: 'subtitle1' },
                  '&.sizeLarge': { typography: 'h6' },
                  number: 2,
                }}
              >
                {title}
              </Box>
            )}

            {details && (
              <Box className={classes.details} sx={{ color: 'text.secondary' }}>
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
              sx={{
                textAlign: 'right',
                typography: 'body1',
                '&.sizeMedium': { typographty: 'subtitle1' },
                '&.sizeLarge': { typography: 'h6' },
              }}
            >
              {price}
            </Box>
          )}
        </Box>

        {after && (
          <Box className={classes.after} sx={{ backgroundColor: 'yellow' }}>
            {after}
          </Box>
        )}
      </Box>
    </RenderComponent>
  )
}
