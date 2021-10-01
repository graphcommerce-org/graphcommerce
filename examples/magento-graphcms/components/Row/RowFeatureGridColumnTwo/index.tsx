import { SvgImage, responsiveVal } from '@graphcommerce/next-ui'
import { Button, Container, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import Asset from '../../Asset'
import { iconUspCheck, iconClock } from '../../Theme/icons/icons'
import Timer from './Timer'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: '#F3F5F7',
    },
    container: {
      padding: `${responsiveVal(50, 200)} 0`,
      display: 'grid',
      gridTemplateAreas: `
      "copy"
      "graphic"
      "usps"
    `,
      gridTemplateColumns: '80%',
      justifyContent: 'center',
      rowGap: responsiveVal(40, 80),
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `
      "copy graphic"
      "usps graphic"
    `,
        gridTemplateColumns: 'minmax(400px, 700px) minmax(200px, 450px)',
        gridTemplateRows: 'auto auto',
        justifyContent: 'space-between',
      },
      columnGap: theme.spacings.lg,
    },
    copy: {
      marginTop: responsiveVal(20, 60),
      gridArea: 'copy',
    },
    grid: {
      display: 'grid',
      gridArea: 'usps',
      gridTemplateColumns: `repeat(2, minmax(200px, 320px))`,
      justifyContent: 'space-between',
      columnGap: responsiveVal(20, 40),
      rowGap: responsiveVal(20, 40),
      '& > *': {
        display: 'grid',
        gridTemplateColumns: `50px auto`,
        alignItems: 'center',
      },
    },
    h4: {
      fontSize: responsiveVal(14, 20),
    },
    phone: {
      position: 'relative',
      margin: '0 auto 50px auto',
      width: '50%',
      [theme.breakpoints.up('md')]: {
        width: '100%',
        margin: '0 auto',
      },
      aspectRatio: '436/883',
      gridArea: 'graphic',
      justifySelf: 'end',
    },
    timers: {
      color: '#62C7B0',
      marginTop: '-12%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: responsiveVal(20, 90),
      '& > div': {
        width: 'max-content',
        '& > h4': {
          textTransform: 'uppercase',
          fontSize: responsiveVal(12, 18),
          fontWeight: 600,
          letterSpacing: 1,
          lineHeight: 1.2,
          margin: `0 0 ${responsiveVal(2, 4)} 0`,
        },
      },
      '& > div:first-of-type': {
        justifySelf: 'flex-end',
      },
    },
    timer: {
      display: 'grid',
      gridTemplateColumns: `32px auto`,
      alignItems: 'center',
      '& > pre': {
        margin: 0,
        fontWeight: 500,
        fontSize: responsiveVal(14, 19),
      },
    },
    playbutton: {
      position: 'absolute',
      left: '50%',
      top: '50%',
    },
    overline: {
      backgroundImage: 'none',
      '-webkit-background-clip': 'initial',
      '-moz-background-clip': 'initial',
      '-webkit-text-fill-color': 'initial',
      '-moz-text-fill-color': 'initial',
    },
  }),
  { name: 'RowFeatureGridColumnTwo' },
)

export default function RowFeatureGridColumnTwo() {
  const classes = useStyles()
  const [reset, setReset] = useState(0)
  const [play, setPlay] = useState(false)
  const theme = useTheme()

  const phoneAsset = {
    url: '/phone.svg',
    width: 436,
    height: 883,
    mimeType: 'image/jpeg',
  }

  const phoneAnimationAsset = {
    url: '/phoneAnimation.svg',
    width: 436,
    height: 883,
    mimeType: 'image/jpeg',
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.copy}>
          <Typography variant='overline' className={classes.overline}>
            Every project a head start
          </Typography>
          <Typography variant='h2'>Blazing Fast</Typography>
          <Typography paragraph variant='h3' color='textSecondary'>
            GraphCommerce® has been designed and built as a PWA. It is optimized for Google’s Core
            Web Vitals, scoring great on all metrics: LCP, FID and CLS. Since Google and Facebook
            actively contribute to Next.js and React, GraphCommerce® is set to become even better
            and faster.
          </Typography>
        </div>

        <div className={classes.phone}>
          {!play ? (
            <Asset
              asset={phoneAsset}
              sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }}
            />
          ) : (
            <Asset
              asset={phoneAnimationAsset}
              sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }}
            />
          )}
          <div className={classes.timers}>
            <div>
              <Typography variant='h4'>Website</Typography>
              <div className={classes.timer}>
                <SvgImage src={iconClock} alt='box' loading='eager' size='small' />
                <Timer maxSeconds={3} maxMilliseconds={4} reset={reset} />
              </div>
            </div>
            <div>
              <Typography variant='h4'>PWA</Typography>
              <div className={classes.timer}>
                <SvgImage src={iconClock} alt='box' loading='eager' size='small' />
                <Timer maxSeconds={1} maxMilliseconds={19} reset={reset} />
              </div>
            </div>
          </div>
          {!play ? (
            <button
              className={classes.playbutton}
              onClick={() => {
                setReset(1)
                setPlay(true)
              }}
            >
              Play
            </button>
          ) : null}
        </div>

        <div className={classes.grid}>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              Hybrid Static Site Generation (SSG)
            </Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              Page-based Javascript bundling and splitting
            </Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              CSS critical rendering path
            </Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              Advanced CDN serving both assets and pages
            </Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              Image and font rendering and download optimization
            </Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              Fetch only required data using GraphQL
            </Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              Viewport URL prefetching
            </Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4' className={classes.h4}>
              Long-term browser caching, even between builds
            </Typography>
          </div>
        </div>
      </Container>
    </Container>
  )
}
