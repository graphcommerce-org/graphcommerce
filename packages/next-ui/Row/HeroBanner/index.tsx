import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import React from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
    wrapper: {
      position: 'relative',
    },
    copy: {
      color: '#fff',
      display: 'grid',
      justifyItems: 'center',
      alignContent: 'center',
      padding: `${theme.spacings.lg} ${theme.spacings.md}`,
      minHeight: '90vh',
      '& > *': {
        maxWidth: 'max-content',
      },
      [theme.breakpoints.up('md')]: {
        width: '70%',
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
        width: '50%',
      },
    },
    asset: {
      position: 'absolute',
      top: '0',
      zIndex: -1,
      width: '100%',
      height: '100%',
      display: 'grid',
      justifyItems: 'center',
      overflow: 'hidden',
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

type HeroBannerProps = UseStyles<typeof useStyles> & {
  pageLinks: React.ReactNode
  videoSrc: string
  children: React.ReactNode
}

export default function HeroBanner(props: HeroBannerProps) {
  const { pageLinks, videoSrc, children } = props
  const classes = useStyles(props)

  const { scrollY } = useViewportScroll()
  const actionsAnimWidth = useTransform(
    scrollY,
    [10, 150],
    [`calc(100% - ${responsiveVal(30, 60)})`, `calc(100% - ${responsiveVal(0, 0)})`],
  )

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.copy}>
          {children}
          {pageLinks}
        </div>
        <div className={classes.asset}>
          <m.video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: actionsAnimWidth }}
          />
        </div>
      </div>
    </div>
  )
}
