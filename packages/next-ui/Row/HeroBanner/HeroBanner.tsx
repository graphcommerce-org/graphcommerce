import { clientSize } from '@graphcommerce/framer-utils'
import { ContainerProps, Box, styled, Theme, SxProps } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import React from 'react'
import { useScrollY } from '../../Layout/hooks/useScrollY'
import { extendableComponent, responsiveVal } from '../../Styles'
import { Row } from '../Row'

export type HeroBannerProps = ContainerProps & {
  pageLinks: React.ReactNode
  videoSrc: string
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'HeroBanner' as const
const parts = ['root', 'wrapper', 'copy', 'asset', 'animated', 'video'] as const
const { classes } = extendableComponent(compName, parts)

const MotionVideo = styled(m.video)({})

export function HeroBanner(props: HeroBannerProps) {
  const { pageLinks, videoSrc, children, sx = [], ...containerProps } = props
  const scrollY = useScrollY()
  const scale = useTransform([scrollY, clientSize.y], ([scrollYCurr, clientSizeYCurr]: number[]) =>
    clientSizeYCurr ? (scrollYCurr / clientSizeYCurr) * 1.7 + 1 : 1,
  )

  return (
    <Row
      maxWidth={false}
      {...containerProps}
      className={classes.root}
      sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        className={classes.wrapper}
        sx={(theme) => ({
          display: 'grid',
          overflow: 'hidden',
          borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
          isolation: 'isolate',
        })}
      >
        <Box
          className={classes.copy}
          sx={(theme) => ({
            gridArea: '1 / 1',
            zIndex: 1,
            display: 'grid',
            justifyItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            p: theme.spacings.md,
            color: theme.palette.secondary.contrastText,
          })}
        >
          {children}
          {pageLinks}
        </Box>
        <Box
          className={classes.asset}
          sx={{
            gridArea: '1 / 1',
            position: 'relative',
          }}
        >
          <MotionVideo
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            disableRemotePlayback
            className={classes.video}
            style={{ scale }}
            sx={{
              position: 'absolute',
              transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </Row>
  )
}
