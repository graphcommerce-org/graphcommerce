import { ContainerProps, Theme, makeStyles } from '@material-ui/core'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
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
      minHeight: `calc(100vh - ${theme.headerHeight.sm})`,
      ['@supports (-webkit-touch-callout: none)']: {
        minHeight: '-webkit-fill-available',
      },
      '& > *': {
        zIndex: 1,
        maxWidth: 'max-content',
      },

      [theme.breakpoints.up('md')]: {
        width: '70%',
        minHeight: `calc(100vh - ${theme.headerHeight.md})`,
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
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
      },
      [theme.breakpoints.up('md')]: {
        height: '100%',
      },
    },
  }),
  { name: 'HeroBanner' },
)

export type HeroBannerProps = UseStyles<typeof useStyles> &
  ContainerProps & {
    pageLinks: React.ReactNode
    videoSrc: string
    children: React.ReactNode
  }

export default function HeroBanner(props: HeroBannerProps) {
  const { pageLinks, videoSrc, children, ...containerProps } = props
  const classes = useStyles(props)

  const { scrollY } = useViewportScroll()
  const actionsAnimWidth = useTransform(
    scrollY,
    [10, 150],
    [`calc(100% - ${responsiveVal(30, 60)})`, `calc(100% - ${responsiveVal(0, 0)})`],
  )

  return (
    <Row maxWidth={false} {...containerProps} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.copy}>
          {children}
          {pageLinks}
        </div>
        <div className={classes.asset}>
          <m.div style={{ width: actionsAnimWidth }}>
            <video src={videoSrc} autoPlay muted loop playsInline disableRemotePlayback />
          </m.div>
        </div>
      </div>
    </Row>
  )
}
