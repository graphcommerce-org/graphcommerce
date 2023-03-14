import Box, { BoxProps } from '@mui/material/Box'
import { ButtonProps } from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import { SxProps, Theme, alpha } from '@mui/material/styles'
import React from 'react'
import { extendableComponent, responsiveVal } from '../Styles'
import { breakpointVal } from '../Styles/breakpointVal'

type Variants = 'outlined' | 'default'
type Size = 'large' | 'medium' | 'small'
type Color = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
type Layout = 'inline' | 'grid' | 'list' | 'stack'

function isButtonProps(props: ButtonProps<'div'> | BoxProps<'div'>): props is ButtonProps<'div'> {
  return props.onClick !== undefined
}

const ButtonOrBox = (props: ButtonProps<'div'> | BoxProps<'div'>) =>
  isButtonProps(props) ? <ButtonBase component='div' {...props} /> : <Box {...props} />

export type ActionCardProps = {
  variant?: Variants
  size?: Size
  color?: Color
  layout?: Layout
  sx?: SxProps<Theme>
  title?: string | React.ReactNode
  image?: React.ReactNode
  action?: React.ReactNode
  details?: React.ReactNode
  price?: React.ReactNode
  after?: React.ReactNode
  secondaryAction?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLElement>, value: string | number | null) => void
  selected?: boolean
  value: string | number | null
  reset?: React.ReactNode
  disabled?: boolean
  error?: boolean
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
  variant: Variants
  size: Size
  color: Color
  layout: Layout
  selected: boolean
  disabled: boolean
  image: boolean
  error: boolean
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
    reset,
    disabled = false,
    size = 'medium',
    color = 'primary',
    variant = 'outlined',
    layout = 'list',
    error = false,
  } = props

  const classes = withState({
    disabled,
    selected,
    image: Boolean(image),
    variant,
    size,
    color,
    layout,
    error,
  })

  return (
    <ButtonOrBox
      className={classes.root}
      onClick={onClick && ((event) => onClick?.(event, value))}
      disabled={disabled}
      sx={[
        (theme) => ({
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 1.5,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),

          '&.sizeSmall': {
            px: responsiveVal(8, 12),
            py: responsiveVal(4, 6),
            display: 'flex',
            typography: 'body2',
          },
          '&.sizeMedium': {
            px: responsiveVal(10, 14),
            py: responsiveVal(10, 12),
            typography: 'body2',
            display: 'block',
          },
          '&.sizeLarge': {
            px: responsiveVal(12, 16),
            py: responsiveVal(12, 14),
            display: 'block',
          },

          '&.variantDefault': {
            '&::after': {
              content: '""',
              display: 'block',
              position: 'absolute',
              width: '100%',
              left: 0,
              bottom: '-1px',
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
            '&.selected': {
              backgroundColor: `${alpha(
                theme.palette[color].main,
                theme.palette.action.hoverOpacity,
              )}`,
            },
            '&.error': {
              backgroundColor: `${alpha(
                theme.palette.error.main,
                theme.palette.action.hoverOpacity,
              )}`,
            },

            '&.variantDefault.sizeSmall': {
              mt: { xs: '2px', sm: '3px', md: '5px' },
              mb: { xs: '3px', sm: '4px', md: '6px' },
              '&::after': {
                mb: { xs: '-2px', sm: '-3px', md: '-5px' },
              },
            },
            '&.variantDefault.sizeMedium': {
              mt: { xs: '4px', sm: '5px', md: '6px' },
              mb: { xs: '5px', sm: '6px', md: '7px' },
              '&::after': {
                mb: { xs: '-4px', sm: '-5px', md: '-6px' },
              },
            },
            '&.variantDefault.sizeLarge': {
              mt: { xs: '5px', sm: '7px', md: '8px' },
              mb: { xs: '6px', sm: '8px', md: '9px' },
              '&::after': {
                mb: { xs: '-5px', sm: '-7px', md: '-8px' },
              },
            },
          },

          '&.variantOutlined': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: `inset 0 0 0 1px ${theme.palette.divider}`,
            '&:not(:last-of-type)': {
              marginBottom: '-1px',
            },

            '&.layoutList': {
              borderRadius: 0,
              '&:first-of-type': {
                ...breakpointVal(
                  'borderTopLeftRadius',
                  theme.shape.borderRadius * 3,
                  theme.shape.borderRadius * 4,
                  theme.breakpoints.values,
                ),
                ...breakpointVal(
                  'borderTopRightRadius',
                  theme.shape.borderRadius * 3,
                  theme.shape.borderRadius * 4,
                  theme.breakpoints.values,
                ),
              },
              '&:last-of-type': {
                ...breakpointVal(
                  'borderBottomLeftRadius',
                  theme.shape.borderRadius * 3,
                  theme.shape.borderRadius * 4,
                  theme.breakpoints.values,
                ),
                ...breakpointVal(
                  'borderBottomRightRadius',
                  theme.shape.borderRadius * 3,
                  theme.shape.borderRadius * 4,
                  theme.breakpoints.values,
                ),
              },
            },

            '&.selected': {
              borderColor: 'transparent',
              boxShadow: `inset 0 0 0 2px ${theme.palette[color].main}`,
            },
            '&.selected:focus': {
              borderColor: 'transparent',
              boxShadow: `inset 0 0 0 2px ${theme.palette[color].main}, 0 0 0 4px ${alpha(
                theme.palette[color].main,
                theme.palette.action.hoverOpacity,
              )}`,
            },
            '&:focus': {
              boxShadow: `inset 0 0 0 1px ${theme.palette.divider},0 0 0 4px ${alpha(
                theme.palette[color].main,
                theme.palette.action.hoverOpacity,
              )}`,
            },

            '&.error': {
              boxShadow: `0 0 0 2px ${theme.palette.error.main}`,
            },
          },
          '&.selected': {
            zIndex: 1,
          },
          '&.disabled': {
            background: theme.palette.action.disabledBackground,
            opacity: theme.palette.action.disabledOpacity,
            color: theme.palette.action.disabled,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignContent: 'stretch',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'stretch',
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
                  '&.sizeLarge': { typography: 'h6' },
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
            <Box
              className={classes.action}
              sx={(theme) => ({ marginBottom: '5px', color: theme.palette[color].main })}
            >
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
      </Box>
      {after && <Box className={classes.after}>{after}</Box>}
    </ButtonOrBox>
  )
}
