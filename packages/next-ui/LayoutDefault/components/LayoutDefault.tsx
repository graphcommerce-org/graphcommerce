import { useScrollOffset } from '@graphcommerce/framer-next-pages'
import { Box, SxProps, Theme } from '@mui/material'
import { useTransform, useViewportScroll } from 'framer-motion'
import LayoutProvider from '../../Layout/components/LayoutProvider'
import { extendableComponent, responsiveVal } from '../../Styles'

export type LayoutDefaultProps = {
  className?: string
  beforeHeader?: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  menuFab?: React.ReactNode
  cartFab?: React.ReactNode
  children?: React.ReactNode
  noSticky?: boolean
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = {
  noSticky?: boolean
}
const parts = ['root', 'fabs', 'header', 'children', 'footer'] as const
const { withState } = extendableComponent<OwnerState, 'LayoutDefault', typeof parts>(
  'LayoutDefault',
  parts,
)

export function LayoutDefault(props: LayoutDefaultProps) {
  const { children, header, beforeHeader, footer, menuFab, cartFab, noSticky, sx = [] } = props

  const offset = useScrollOffset().y
  const scrollWithOffset = useTransform(useViewportScroll().scrollY, (y) => y + offset)

  const classes = withState({ noSticky })
  const fabIconSize = responsiveVal(42, 56) // @todo generalize this

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          minHeight: '100vh',
          '@supports (-webkit-touch-callout: none)': {
            minHeight: '-webkit-fill-available',
          },
          display: 'grid',
          gridTemplateRows: `auto auto 1fr auto`,
          gridTemplateColumns: '100%',
          background: theme.palette.background.default,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <LayoutProvider scroll={scrollWithOffset}>
        {beforeHeader}
        <Box
          component='header'
          className={classes.header}
          sx={(theme) => ({
            zIndex: theme.zIndex.appBar - 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: theme.appShell.headerHeightSm,
            pointerEvents: 'none',
            '& > *': {
              pointerEvents: 'all',
            },
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.headerHeightMd,
              padding: `0 ${theme.page.horizontal} 0`,
              top: 0,
              display: 'flex',
              justifyContent: 'left',
              width: '100%',
            },
            '&.sticky': {
              [theme.breakpoints.down('md')]: {
                position: 'sticky',
                top: 0,
              },
            },
          })}
        >
          {header}
        </Box>
        {(menuFab || cartFab) && (
          <Box
            className={classes.fabs}
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: 0,
              zIndex: 'drawer',
              [theme.breakpoints.up('sm')]: {
                padding: `0 ${theme.page.horizontal}`,
                position: 'sticky',
                marginTop: `calc(${theme.appShell.headerHeightMd} * -1 + calc(${fabIconSize} / 2))`,
                top: `calc(${theme.appShell.headerHeightMd} / 2 - ${responsiveVal(
                  42 / 2,
                  56 / 2,
                )})`,
              },
              [theme.breakpoints.down('md')]: {
                position: 'fixed',
                top: 'unset',
                bottom: `calc(20px + ${fabIconSize})`,
                padding: `0 20px`,
                '@media (max-height: 530px)': {
                  display: 'none',
                },
              },
            })}
          >
            {menuFab}
            {cartFab}
          </Box>
        )}
        <div className={classes.children}>{children}</div>
        <div className={classes.footer}>{footer}</div>
      </LayoutProvider>
    </Box>
  )
}
