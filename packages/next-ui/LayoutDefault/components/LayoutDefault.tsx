import { useScrollOffset } from '@graphcommerce/framer-next-pages'
import { dvh } from '@graphcommerce/framer-utils'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { useScroll, useTransform } from 'framer-motion'
import { Container } from '../../Container/Container'
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
const parts = ['root', 'fabs', 'beforeHeader', 'header', 'children', 'footer'] as const
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
          gridTemplate: `
            "beforeHeader" auto
            "header" auto
            "fabs" auto
            "children" 1fr
            "footer" auto / 100%
          `,
          background: theme.palette.background.default,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SkipLink />
      <LayoutProvider scroll={scrollYOffset}>
        {beforeHeader ? (
          <Box sx={{ gridArea: 'beforeHeader' }} className={classes.beforeHeader}>
            {beforeHeader}
          </Box>
        ) : null}
        <Container
          sizing='shell'
          maxWidth={false}
          component='header'
          className={classes.header}
          sx={(theme) => ({
            gridArea: 'header',
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
        </Container>
        {menuFab || cartFab ? (
          <Container
            sizing='shell'
            maxWidth={false}
            className={classes.fabs}
            sx={(theme) => {
              const negativeHeaderHeightMd = `(${theme.appShell.headerHeightMd} * -1)`
              const topMd = `(${theme.appShell.headerHeightMd}  - ${fabIconSize}) / 2`

              return {
                gridArea: 'fabs',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                height: 0,
                zIndex: 'speedDial',
                [theme.breakpoints.up('md')]: {
                  position: 'sticky',
                  marginTop: `calc(${negativeHeaderHeightMd} + ${topMd})`,
                  top: `calc(${topMd})`,
                },
                [theme.breakpoints.down('md')]: {
                  position: 'fixed',
                  bottom: `calc(20px + ${fabIconSize})`,
                  padding: '0 20px',
                  '@media (max-height: 530px) and (orientation: portrait)': {
                    display: 'none',
                  },
                },
              }
            }}
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
          </Container>
        ) : (
          <div />
        )}
        <Box sx={{ gridArea: 'children' }} className={classes.children}>
          <div id='skip-nav' tabIndex={-1} />
          {children}
        </Box>
        <Box sx={{ gridArea: 'footer' }} className={classes.footer}>
          {footer}
        </Box>
      </LayoutProvider>
    </Box>
  )
}
