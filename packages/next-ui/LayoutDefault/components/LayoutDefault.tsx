import { useScrollOffset } from '@graphcommerce/framer-next-pages'
import { dvh } from '@graphcommerce/framer-utils'
import { Box, SxProps, Theme } from '@mui/material'
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
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = {
  stickyHeader?: boolean
}

const parts = [
  'root',
  'fabs',
  'beforeHeader',
  'header',
  'children',
  'footer',
  'cartFab',
  'menuFab',
] as const
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
    stickyHeader = false,
    className,
    sx = [],
  } = props

  const { scrollY } = useScroll()
  const scrollYOffset = useTransform(
    [scrollY, useScrollOffset()],
    ([y, offset]: number[]) => y + offset,
  )

  const classes = withState({ stickyHeader })
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

          // '&.stickyHeader .LayoutHeaderContent-content': {
          //   [theme.breakpoints.up('md')]: {
          //     pt: theme.spacings.sm,
          //   },
          // },
          // '&.stickyHeader .CompareFab-root': {
          //   [theme.breakpoints.up('md')]: {
          //     mt: theme.spacings.sm,
          //   },
          // },
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
            pointerEvents: 'none' as const,
            '& > *': {
              pointerEvents: 'all' as const,
              zIndex: theme.zIndex.appBar,
            },
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.headerHeightMd,
              top: 0,
              display: 'flex',
              justifyContent: 'left',
              width: '100%',
            },
            '&.stickyHeader': {
              [theme.breakpoints.up('md')]: {
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
                zIndex: theme.zIndex.appBar,
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
            <Box
              className={classes.menuFab}
              sx={{ '&.stickyHeader > *': { display: { md: 'none' } } }}
            >
              {menuFab}
            </Box>
            {cartFab && (
              <Box
                className={classes.cartFab}
                sx={(theme) => {
                  const topMd = `(${theme.appShell.headerHeightMd}  - ${fabIconSize}) / 2`
                  return {
                    display: 'flex',
                    flexDirection: 'row-reverse',

                    [theme.breakpoints.down('md')]: {
                      columnGap: theme.spacings.sm,
                    },

                    [theme.breakpoints.up('md')]: {
                      rowGap: `calc(${topMd})`,
                      '&.stickyHeader': {
                        rowGap: `calc(${topMd} + ${theme.spacings.sm})`,
                      },

                      flexDirection: 'column',
                      alignItems: 'flex-end',
                    },
                  }
                }}
              >
                {cartFab}
              </Box>
            )}
          </Container>
        ) : (
          <div />
        )}
        <Box
          sx={(theme) => ({
            gridArea: 'children',
            '&.stickyHeader': {
              [theme.breakpoints.up('md')]: {
                pt: theme.spacings.sm,
              },
            },
          })}
          className={classes.children}
        >
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
