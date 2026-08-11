import type { ContainerProps, SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import { extendableComponent, responsiveVal } from '../../Styles'
import { Row } from '../Row'

export type HeroBannerProps = ContainerProps & {
  pageLinks: React.ReactNode
  /**
   * Rendered full-bleed behind the copy. Takes a node rather than a source, so
   * the banner is agnostic about what fills it — an image, a video, a CMS
   * component. See `SpecialBanner`, which takes its asset the same way.
   */
  asset?: React.ReactNode
  /**
   * @deprecated Pass an `asset` node instead — e.g. `<Asset asset={…} />`,
   * which also renders images and can carry a poster. When set (and `asset`
   * is not), it renders a bare autoplaying video, without the scroll parallax
   * earlier versions applied.
   */
  videoSrc?: string
  children: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'HeroBanner'
// `video` and `animated` are unused since the banner stopped rendering its own
// motion video, but stay in the parts list so the generated class names remain
// available to consumers targeting them in global CSS.
const parts = ['root', 'wrapper', 'copy', 'asset', 'animated', 'video'] as const
const { classes } = extendableComponent(compName, parts)

export function HeroBanner(props: HeroBannerProps) {
  const { pageLinks, asset, videoSrc, children, sx = [], ...containerProps } = props

  return (
    <Row maxWidth={false} {...containerProps} className={classes.root} sx={sx}>
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
            color: theme.vars.palette.secondary.contrastText,
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
            // The banner sizes itself from its copy, so whatever is passed has
            // to fill the box rather than dictate it.
            '& img, & video': {
              position: 'absolute',
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            },
          }}
        >
          {asset ??
            (videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                disableRemotePlayback
                className={classes.video}
              />
            ) : null)}
        </Box>
      </Box>
    </Row>
  )
}
