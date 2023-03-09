import { ContainerProps, Box, styled } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import React from 'react'
import { useScrollY } from '../../Layout/hooks/useScrollY'
import { extendableComponent } from '../../Styles'
import { breakpointVal } from '../../Styles/breakpointVal'
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
  const scrollY = useScrollY()
  const viewportHeight = global.window && window.innerWidth * 0.7
  const scale = useTransform(scrollY, [0, viewportHeight], [1, 1.7])

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
            minHeight: `calc(70vh - ${theme.appShell.headerHeightSm})`,
            '& > *': {
              zIndex: 1,
              maxWidth: 'max-content',
            },
            [theme.breakpoints.up('md')]: {
              width: '70%',
              minHeight: `calc(70vh - ${theme.appShell.headerHeightMd})`,
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
            width: `calc(100% - ${theme.page.horizontal} - ${theme.page.horizontal})`,
            mx: theme.page.horizontal,
            height: '100%',
            display: 'grid',
            justifyItems: 'center',
            overflow: 'hidden',
            '& video': {
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            },
            ...breakpointVal(
              'borderRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
          })}
        >
          <MotionDiv
            style={{ scale }}
            className={classes.animated}
            sx={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
            }}
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
