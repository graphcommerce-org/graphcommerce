import { ContainerProps, useTheme, useMediaQuery } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import React from 'react'
import { Row } from '..'
import { useScrollY } from '../../Layout/hooks/useScrollY'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'HeroBanner' })((theme) => ({
  wrapper: {
    position: 'relative',
  },
  copy: {
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
  },
  asset: {
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
        borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
      },
    },
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  animated: {
    borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
    overflow: 'hidden',
    transform: 'translateZ(0)',
  },
}))

export type HeroBannerProps = UseStyles<typeof useStyles> &
  ContainerProps & {
    pageLinks: React.ReactNode
    videoSrc: string
    children: React.ReactNode
  }

export function HeroBanner(props: HeroBannerProps) {
  const { pageLinks, videoSrc, children, ...containerProps } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)
  const theme = useTheme()
  const scrollY = useScrollY()
  const width = useTransform(
    scrollY,
    [10, 150],
    [`calc(100% - ${responsiveVal(20, 60)}))`, `calc(100% - ${responsiveVal(0, 0)})`],
  )
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const borderRadius = useTransform(
    scrollY,
    [10, 150],
    [`${responsiveVal(8, 12)}`, `${responsiveVal(0, 0)}`],
  )

  return (
    <Row maxWidth={false} {...containerProps} disableGutters>
      <div className={classes.wrapper}>
        <div className={classes.copy}>
          {children}
          {pageLinks}
        </div>
        <div className={classes.asset}>
          <m.div style={{ width: !matches ? width : 0, borderRadius }} className={classes.animated}>
            <video src={videoSrc} autoPlay muted loop playsInline disableRemotePlayback />
          </m.div>
        </div>
      </div>
    </Row>
  )
}
