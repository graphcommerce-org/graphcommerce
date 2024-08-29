import { alpha, Box, BoxProps, ButtonBase, lighten, SxProps, Theme } from '@mui/material'
import React from 'react'
import { extendableComponent, responsiveVal } from '../Styles'
import { breakpointVal } from '../Styles/breakpointVal'

type Variants = 'outlined' | 'default'
type Size = 'large' | 'medium' | 'small' | 'responsive'
type Color = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
type Layout = 'inline' | 'grid' | 'list' | 'stack'

export type ActionCardProps<C extends React.ElementType = typeof Box> = {
  component?: C
  variant?: Variants
  size?: Size
  color?: Color
  layout?: Layout
  sx?: SxProps<Theme>
  title?: React.ReactNode
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
  slotProps?: {
    root?: React.ComponentPropsWithoutRef<C>
    rootInner?: BoxProps
    image?: BoxProps
    title?: BoxProps
    action?: BoxProps
    details?: BoxProps
    price?: BoxProps
    after?: BoxProps
    secondaryAction?: BoxProps
    reset?: BoxProps
    end?: BoxProps
  }
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

const combineSx = (defaultSx: SxProps<Theme>, slotSx?: SxProps<Theme>) => [
  ...(Array.isArray(defaultSx) ? defaultSx : [defaultSx]),
  ...(Array.isArray(slotSx) ? slotSx : [slotSx]),
]

export function ActionCard<C extends React.ElementType = typeof Box>(props: ActionCardProps<C>) {
  const {
    component: Component = ButtonBase,
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
    slotProps = {},
    ...other
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
    <Component
      className={`ActionCard-root ${classes.root}`}
      onClick={onClick ? (event) => onClick(event, value) : undefined}
      disabled={disabled}
      sx={combineSx(
        [
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
              '&.selected': {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
                    : lighten(theme.palette.background.default, theme.palette.action.hoverOpacity),
              },
              '&.error': {
                backgroundColor: alpha(theme.palette.error.main, theme.palette.action.hoverOpacity),
              },
              '&:focus': {
                outline: 'none',
                boxShadow: `0 0 0 4px ${alpha(theme.palette[color].main, theme.palette.action.focusOpacity)}`,
              },
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
        ],
        slotProps.root?.sx,
      )}
      {...slotProps.root}
      {...other}
    >
      <Box
        className={classes.rootInner}
        sx={combineSx(
          {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignContent: 'stretch',
            alignItems: 'center',
          },
          slotProps.rootInner?.sx,
        )}
        {...slotProps.rootInner}
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
              sx={combineSx(
                { display: 'flex', pr: '15px', alignSelf: 'center' },
                slotProps.image?.sx,
              )}
              {...slotProps.image}
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
                sx={combineSx(
                  {
                    '&.sizeSmall': { typography: 'body1' },
                    '&.sizeMedium': { typography: 'body1' },
                    '&.sizeLarge': { typography: 'h6' },
                    '&.sizeResponsive': { typography: { xs: 'body1', md: 'body1', lg: 'body1' } },
                  },
                  slotProps.title?.sx,
                )}
                {...slotProps.title}
              >
                {title}
              </Box>
            )}
            {details && (
              <Box
                className={classes.details}
                sx={combineSx({ color: 'text.secondary' }, slotProps.details?.sx)}
                {...slotProps.details}
              >
                {details}
              </Box>
            )}
            {secondaryAction && (
              <Box
                className={classes.secondaryAction}
                sx={combineSx({}, slotProps.secondaryAction?.sx)}
                {...slotProps.secondaryAction}
              >
                {secondaryAction}
              </Box>
            )}
          </Box>
        </Box>
        <Box
          className={classes.end}
          sx={combineSx(
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            },
            slotProps.end?.sx,
          )}
          {...slotProps.end}
        >
          {action && (
            <Box
              className={classes.action}
              sx={combineSx(
                (theme) => ({ marginBottom: '5px', color: theme.palette[color].main }),
                slotProps.action?.sx,
              )}
              {...slotProps.action}
            >
              {!selected ? action : reset}
            </Box>
          )}
          {price && !disabled && (
            <Box
              className={classes.price}
              sx={combineSx(
                {
                  textAlign: 'right',
                  typography: 'body1',
                  '&.sizeMedium': { typography: 'subtitle1' },
                  '&.sizeLarge': { typography: 'h6' },
                  '&.sizeResponsive': { typography: { xs: 'body1', md: 'subtitle1', lg: 'h6' } },
                },
                slotProps.price?.sx,
              )}
              {...slotProps.price}
            >
              {price}
            </Box>
          )}
        </Box>
      </Box>
      {after && (
        <Box className={classes.after} sx={combineSx({}, slotProps.after?.sx)} {...slotProps.after}>
          {after}
        </Box>
      )}
    </Component>
  )
}
