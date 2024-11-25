import { useScrollOffset } from '@graphcommerce/framer-next-pages'
import { dvh } from '@graphcommerce/framer-utils'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { useScroll, useTransform } from 'framer-motion'
import { LayoutProvider } from '../../Layout/components/LayoutProvider'
import { SkipLink } from '../../SkipLink/SkipLink'
import { extendableComponent } from '../../Styles'
import { useFabSize } from '../../Theme'

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
  const {
    children,
    header,
    beforeHeader,
    footer,
    menuFab,
    cartFab,
    noSticky,
    className,
    sx = [],
  } = props

  const { scrollY } = useScroll()
  const scrollYOffset = useTransform(
    [scrollY, useScrollOffset()],
    ([y, offset]: number[]) => y + offset,
  )

  const classes = withState({ noSticky })

  const fabIconSize = useFabSize('responsive')

  return (
    <Box
      className={`${classes.root} ${className ?? ''}`}
      sx={[
        (theme) => ({
          minHeight: dvh(100),
          '@supports (-webkit-touch-callout: none)': {
            minHeight: '-webkit-fill-available',
          },
          display: 'grid',
          gridTemplateRows: { xs: 'auto 1fr auto', md: 'auto auto 1fr auto' },
          gridTemplateColumns: '100%',
          background: theme.palette.background.default,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SkipLink />
      <LayoutProvider scroll={scrollYOffset}>
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
        {menuFab || cartFab ? (
          <Box
            className={classes.fabs}
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: 0,
              zIndex: 'speedDial',
              [theme.breakpoints.up('sm')]: {
                padding: `0 ${theme.page.horizontal}`,
                position: 'sticky',
                marginTop: `calc(${theme.appShell.headerHeightMd} * -1 - calc(${fabIconSize} / 2))`,
                top: `calc(${theme.appShell.headerHeightMd} / 2 - (${fabIconSize} / 2))`,
              },
              [theme.breakpoints.down('md')]: {
                position: 'fixed',
                top: 'unset',
                bottom: `calc(20px + ${fabIconSize})`,
                padding: '0 20px',
                '@media (max-height: 530px) and (orientation: portrait)': {
                  display: 'none',
                },
              },
            })}
          >
            {menuFab}
            {cartFab && (
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: theme.spacings.sm,
                  [theme.breakpoints.up('md')]: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  },
                })}
              >
                {cartFab}
              </Box>
            )}
          </Box>
        ) : (
          <div />
        )}
        <div className={classes.children}>
          <div id='skip-nav' tabIndex={-1} />
          {children}
        </div>
        <div className={classes.footer}>{footer}</div>
      </LayoutProvider>
    </Box>
  )
}
