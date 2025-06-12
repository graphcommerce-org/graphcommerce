import { useScrollOffset } from '@graphcommerce/framer-next-pages'
import { dvh, StickyBox } from '@graphcommerce/framer-utils'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { useScroll, useTransform } from 'framer-motion'
import React from 'react'
import { Container, useContainerSpacing } from '../../Container/Container'
import { LayoutProvider } from '../../Layout/components/LayoutProvider'
import { SkipLink } from '../../SkipLink/SkipLink'
import { extendableComponent } from '../../Styles'

export type LayoutDefaultProps = {
  className?: string
  beforeHeader?: React.ReactNode
  header: React.ReactNode
  afterHeader?: React.ReactNode
  footer: React.ReactNode
  menuFab?: React.ReactNode
  cartFab?: React.ReactNode
  children?: React.ReactNode
  sx?: SxProps<Theme>
  stickyHeader?: boolean
  stickyBeforeHeader?: boolean
  stickyAfterHeader?: boolean
}

const parts = [
  'root',
  'fabs',
  'beforeHeader',
  'header',
  'afterHeader',
  'children',
  'footer',
  'cartFab',
  'menuFab',
] as const

const { classes } = extendableComponent('LayoutDefault', parts)

export function LayoutDefault(props: LayoutDefaultProps) {
  const {
    children,
    header,
    beforeHeader,
    afterHeader,
    footer,
    menuFab,
    cartFab,
    stickyHeader = false,
    stickyBeforeHeader = false,
    stickyAfterHeader = false,
    className,
    sx = [],
  } = props

  const { scrollY } = useScroll()
  const offset = useScrollOffset()
  const scrollYOffset = useTransform(() => scrollY.get() + offset.get())

  // const fabIconSize = useFabSize('responsive')
  const { padding } = useContainerSpacing({ sizing: 'shell', maxWidth: false })

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
            "fabs" auto
            "header" auto
            "afterHeader" auto
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
        <StickyBox
          sx={(theme) => ({
            gridArea: 'beforeHeader',
            zIndex: theme.zIndex.appBar - 1,
          })}
          stickyConfig={{ sticky: stickyBeforeHeader, to: null, name: 'beforeHeader' }}
          className={classes.beforeHeader}
        >
          {beforeHeader}
        </StickyBox>

        <StickyBox
          component='header'
          stickyConfig={{ sticky: stickyHeader, to: 'beforeHeader', name: 'header' }}
          className={classes.header}
          sx={(theme) => ({
            gridArea: 'header',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            px: padding,
            pointerEvents: 'none' as const,
            '&.sticky': {
              zIndex: theme.zIndex.appBar - 1,
              '& > *': { zIndex: theme.zIndex.appBar },
            },
            '& > *': {
              pointerEvents: 'all' as const,
            },
            height: theme.appShell.headerHeightSm,
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.headerHeightMd,
              display: 'flex',
              justifyContent: 'left',
              width: '100%',
            },
          })}
        >
          {header}
        </StickyBox>

        <StickyBox
          stickyConfig={{ sticky: stickyAfterHeader, to: 'header', name: 'afterHeader' }}
          sx={(theme) => ({
            gridArea: 'afterHeader',
            '&.sticky': {
              zIndex: theme.zIndex.appBar - 1,
            },
          })}
          className={classes.afterHeader}
        >
          {afterHeader}
        </StickyBox>
        {/* 
        {(menuFab || cartFab) && (
          <StickyBox
            stickyConfig={{ sticky: true, to: 'header', name: 'fabs', position: 'center' }}
            className={classes.fabs}
            sx={(theme) => ({
              px: padding,
              gridArea: 'fabs',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: 0,
              zIndex: theme.zIndex.appBar,
              [theme.breakpoints.up('md')]: {
                position: 'sticky',
                // marginTop: `calc(${negativeHeaderHeightMd} + ${topMd})`,
                // top: `calc(${topMd})`,
              },
              [theme.breakpoints.down('md')]: {
                position: 'fixed',
                // bottom: `calc(20px + ${fabIconSize})`,
                padding: '0 20px',
                '@media (max-height: 530px) and (orientation: portrait)': {
                  display: 'none',
                },
              },
            })}
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
                  // const topMd = `(${theme.appShell.headerHeightMd}  - ${fabIconSize}) / 2`
                  return {
                    // display: 'flex',
                    // flexDirection: 'row-reverse',
                    // [theme.breakpoints.down('md')]: {
                    //   columnGap: theme.spacings.sm,
                    // },
                    // [theme.breakpoints.up('md')]: {
                    //   // rowGap: `calc(${topMd})`,
                    //   // '&.stickyHeader': {
                    //   //   rowGap: `calc(${topMd} + ${theme.spacings.sm})`,
                    //   // },
                    //   flexDirection: 'column',
                    //   alignItems: 'flex-end',
                    // },
                  }
                }}
              >
                {cartFab}
              </Box>
            )}
          </StickyBox>
        )} */}

        <StickyBox
          stickyConfig={{ sticky: true, to: 'header', name: 'fabs', position: 'center' }}
          sx={(theme) => ({
            px: padding,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gridArea: 'fabs',
            '& > *': {
              zIndex: theme.zIndex.appBar,
            },
            height: theme.appShell.headerHeightSm,
            marginBottom: `calc(${theme.appShell.headerHeightSm} * -1)`,
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.headerHeightMd,
              marginBottom: `calc(${theme.appShell.headerHeightMd} * -1)`,
            },
          })}
        >
          {menuFab}
          {cartFab}
        </StickyBox>

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
