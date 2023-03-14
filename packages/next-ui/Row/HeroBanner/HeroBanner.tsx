import Box from '@mui/material/Box'
import { ContainerProps } from '@mui/material/Container'
import { useTheme, styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { m, useTransform } from 'framer-motion'
import React from 'react'
import { useScrollY } from '../../Layout/hooks/useScrollY'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'
import { responsiveVal } from '../../Styles/responsiveVal'
import { Row } from '../Row'

export type HeroBannerProps = ContainerProps & {
  pageLinks: React.ReactNode
  videoSrc: string
  children: React.ReactNode
}

const compName = 'HeroBanner' as const
const parts = ['root', 'wrapper', 'copy', 'asset', 'animated', 'video'] as const
const { classes } = extendableComponent(compName, parts)

const MotionDiv = styled(m.div)({})

export function HeroBanner(props: HeroBannerProps) {
  const { pageLinks, videoSrc, children, ...containerProps } = props
  const t = useTheme()
  const scrollY = useScrollY()
  const width = useTransform(
    scrollY,
    [10, 150],
    [`calc(100% - ${responsiveVal(20, 60)}))`, `calc(100% - ${responsiveVal(0, 0)})`],
  )
  const matches = useMediaQuery(t.breakpoints.down('md'))
  const borderRadius = useTransform(
    scrollY,
    [10, 150],
    [`${responsiveVal(8, 12)}`, `${responsiveVal(0, 0)}`],
  )

  return (
    <Row maxWidth={false} {...containerProps} disableGutters className={classes.root}>
      <Box className={classes.wrapper} sx={{ position: 'relative' }}>
        <Box
          className={classes.copy}
          sx={(theme) => ({
            zIndex: 1,
            color: theme.palette.secondary.contrastText,
            position: 'relative',
            display: 'grid',
            justifyItems: 'center',
            alignContent: 'center',
            padding: `${theme.spacings.lg} ${theme.spacings.md}`,
            paddingTop: `calc(${theme.spacings.lg} - ${theme.spacings.md})`,
            minHeight: `calc(100vh - ${theme.appShell.headerHeightSm})`,
            '& > *': {
              zIndex: 1,
              maxWidth: 'max-content',
            },
            [theme.breakpoints.up('md')]: {
              width: '70%',
              minHeight: `calc(100vh - ${theme.appShell.headerHeightMd})`,
            },
            [theme.breakpoints.up('lg')]: {
              padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
              paddingTop: `calc(${theme.spacings.lg} - ${theme.spacings.md})`,
              width: '50%',
            },
          })}
        >
          {children}
          {pageLinks}
        </Box>
        <Box
          className={classes.asset}
          sx={(theme) => ({
            position: 'absolute',
            top: '0',
            zIndex: 0,
            width: '100%',
            height: '100%',
            display: 'grid',
            justifyItems: 'center',
            overflow: 'hidden',
            paddingBottom: theme.page.horizontal,
            '& video': {
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              [theme.breakpoints.down('md')]: {
                ...breakpointVal(
                  'borderRadius',
                  theme.shape.borderRadius * 2,
                  theme.shape.borderRadius * 3,
                  theme.breakpoints.values,
                ),
              },
            },
            [theme.breakpoints.up('md')]: {
              height: '100%',
            },
          })}
        >
          <MotionDiv
            style={{ width: !matches ? width : 0, borderRadius }}
            className={classes.animated}
            sx={(theme) => ({
              ...breakpointVal(
                'borderRadius',
                theme.shape.borderRadius * 2,
                theme.shape.borderRadius * 3,
                theme.breakpoints.values,
              ),
              overflow: 'hidden',
              transform: 'translateZ(0)',
            })}
          >
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              disableRemotePlayback
              className={classes.video}
            />
          </MotionDiv>
        </Box>
      </Box>
    </Row>
  )
}
