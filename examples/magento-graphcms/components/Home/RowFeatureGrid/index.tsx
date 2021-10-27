import { SvgImage, responsiveVal, Row } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import {
  iconPwa,
  iconSeo,
  iconAppFeatures,
  iconContentPages,
  iconJumpstart,
  iconOptimizedPerformance,
} from '../../Theme/icons/icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      padding: `${theme.spacings.xl} 0 1px`,
    },
    copy: {
      margin: `0 auto ${responsiveVal(30, 80)} auto`,
      maxWidth: '70%',
      [theme.breakpoints.up('md')]: {
        width: '700px',
      },
    },
    grid: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: `repeat(auto-fill, minmax(150px, 280px))`,
      justifyContent: 'center',
      columnGap: responsiveVal(50, 180),
      rowGap: responsiveVal(50, 100),
      margin: `0 0 ${responsiveVal(50, 200)} 0`,
      '& > *': {
        display: 'grid',
        gridTemplateRows: `auto auto 1fr`,
      },
    },
  }),
  { name: 'RowFeatureGrid' },
)

export default function RowFeatureGrid() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Row>
        <div className={classes.copy}>
          <Typography variant='overline' component='div' gutterBottom color='primary'>
            Every project a head start
          </Typography>
          <Typography variant='h2' gutterBottom>
            Plug-and-play features
          </Typography>
          <Typography paragraph variant='h5' color='textSecondary'>
            GraphCommerce® is built for developers and agencies with the highest quality demands. It
            offers all the platform features you need to build a killer e-commerce PWA.
          </Typography>
        </div>

        <div className={classes.grid}>
          <div>
            <SvgImage src={iconContentPages} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h5' gutterBottom>
              Rich content pages
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              Tell your brand’s story with rich content product pages and category landing pages.
              You can easily put pages together using content components.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconAppFeatures} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h5' gutterBottom>
              App features
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              Let users install your shop on their home screen or taskbar. GraphCommerce® offers a
              reliable browsing experience even if the data signal is flaky.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconPwa} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h5' gutterBottom>
              Progressive Web App
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              Be amongst the first to qualify as a PWA, Google’s newly set (ranking) standard for
              bringing a native app-like experience to the web.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconOptimizedPerformance} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h5' gutterBottom>
              Optimized performance
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              GraphCommerce® helps you score green Core Web Vitals with little to no effort, thanks
              to built-in features like static generation, bundled JS, viewport URL prefetching and
              more.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconSeo} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h5' gutterBottom>
              Search engine friendly
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              Every shop built with GraphCommerce® can be effortlessly optimized for SEO, featuring
              best practices for canonicals, schema.org, meta data, sitemap.xml and more.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconJumpstart} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h5' gutterBottom>
              Jumpstart every project
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              Start every project with a framework that feels like an app. You build on top of
              production-quality defaults for drawer interfaces, floatable buttons, on-page mega
              menus and more.
            </Typography>
          </div>
        </div>
      </Row>
    </div>
  )
}
