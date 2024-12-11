import type { BoxProps, ButtonProps, SxProps, Theme } from '@mui/material'
import { Box, ButtonBase, alpha, lighten } from '@mui/material'
import React from 'react'
import { extendableComponent, responsiveVal } from '../Styles'
import { breakpointVal } from '../Styles/breakpointVal'

type Variants = 'outlined' | 'default'
type Size = 'large' | 'medium' | 'small' | 'responsive'
type Color = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
type Layout = 'inline' | 'grid' | 'list' | 'stack'

function isButtonProps(props: ButtonProps<'div'> | BoxProps<'div'>): props is ButtonProps<'div'> {
  return props.onClick !== undefined
}

function ButtonOrBox(props: ButtonProps<'div'> | BoxProps<'div'>) {
  return isButtonProps(props) ? <ButtonBase component='div' {...props} /> : <Box {...props} />
}

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
  onClick?: (event: React.MouseEvent<HTMLElement>, value: string | number | boolean | null) => void
  selected?: boolean
  value: string | number | boolean | null
  reset?: React.ReactNode
  disabled?: boolean
  error?: boolean
}

const parts = [
  'root',
  'rootInner',
  'image',
  'title',
  'action',
  'details',
  'price',
  'after',
  'secondaryAction',
  'reset',
  'end',
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

export const actionCardImageSizes = {
  small: responsiveVal(60, 80),
  medium: responsiveVal(60, 80),
  large: responsiveVal(100, 120),
  responsive: responsiveVal(60, 120),
}

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
    size = 'responsive',
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
          '&.sizeResponsive': {
            px: responsiveVal(8, 16),
            py: responsiveVal(4, 14),
            display: { xs: 'flex', md: 'block', lg: 'block' },
            [theme.breakpoints.down('md')]: { typography: 'body2' },
          },

          '&.variantDefault': {
            position: 'relative',
            // '&::after': {
            //   content: '""',
            //   position: 'absolute',
            //   width: '100%',
            //   left: 0,
            //   bottom: '-1px',
            //   borderBottom: `1px solid ${theme.palette.divider}`,
            //   display: 'block',
            // },
            '&.selected': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
                  : lighten(theme.palette.background.default, theme.palette.action.hoverOpacity),
            },
            '&.error': {
              backgroundColor: `${alpha(
                theme.palette.error.main,
                theme.palette.action.hoverOpacity,
              )}`,
            },

            // '&.sizeSmall': {
            //   mt: { xs: '2px', sm: '3px', md: '5px' },
            //   mb: { xs: '3px', sm: '4px', md: '6px' },
            //   '&::after': {
            //     mb: { xs: '-2px', sm: '-3px', md: '-5px' },
            //   },
            // },
            // '&.sizeMedium': {
            //   mt: { xs: '4px', sm: '5px', md: '6px' },
            //   mb: { xs: '5px', sm: '6px', md: '7px' },
            //   '&::after': {
            //     mb: { xs: '-4px', sm: '-5px', md: '-6px' },
            //   },
            // },
            // '&.sizeLarge': {
            //   mt: { xs: '5px', sm: '7px', md: '8px' },
            //   mb: { xs: '6px', sm: '8px', md: '9px' },
            //   '&::after': {
            //     mb: { xs: '-5px', sm: '-7px', md: '-8px' },
            //   },
            // },
            // '&.sizeResponsive': {
            //   mt: responsiveVal(2, 8),
            //   mb: responsiveVal(3, 9),
            //   '&::after': {
            //     mb: responsiveVal(-2, -8),
            //   },
            // },
          },

          '&.variantOutlined': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: `inset 0 0 0 1px ${theme.palette.divider}`,
            '&:not(:last-of-type)': {
              marginBottom: '-2px',
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
            '&.selected:focus, &.error:focus': {
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
              boxShadow: `inset 0 0 0 2px ${theme.palette.error.main}`,
            },
          },
          '&.selected': {
            zIndex: 1,
          },
          '&:focus, &.selected:focus, &.error:focus': {
            zIndex: 2,
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
        className={classes.rootInner}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignContent: 'stretch',
          alignItems: 'center',
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
              sx={{ display: 'flex', pr: '15px', alignSelf: 'center' }}
            >
              {image}
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            {title && (
              <Box
                className={classes.title}
                sx={{
                  '&.sizeSmall': { typography: 'body1' },
                  '&.sizeMedium': { typography: 'body1' },
                  '&.sizeLarge': { typography: 'h6' },
                  '&.sizeResponsive': { typography: { xs: 'body1', md: 'body1', lg: 'body1' } },
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
          className={classes.end}
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
                '&.sizeMedium': { typography: 'subtitle1' },
                '&.sizeLarge': { typography: 'h6' },
                '&.sizeResponsive': { typography: { xs: 'body1', md: 'subtitle1', lg: 'h6' } },
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
