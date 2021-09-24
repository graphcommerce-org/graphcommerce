import { Button, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { SvgImage, responsiveVal } from '@reachdigital/next-ui'
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
    copy: {
      margin: `${responsiveVal(50, 200)} auto ${responsiveVal(30, 80)} auto`,
      maxWidth: '70%',
      [theme.breakpoints.up('sm')]: {
        width: '500px',
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
    <Container maxWidth={false}>
      <Container>
        <div className={classes.copy}>
          <Typography variant='overline'>Every project a head start</Typography>
          <Typography variant='h2'>Plug-and-play features</Typography>
          <Typography paragraph variant='h3' color='textSecondary'>
            GraphCommerce® is built for developers and agencies with the highest quality demands. It
            offers all the platform features you need to build a killer e-commerce PWA.
          </Typography>
        </div>

        <div className={classes.grid}>
          <div>
            <SvgImage src={iconContentPages} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h4'>Rich content pages</Typography>
            <Typography variant='body1'>
              Tell your brand’s story with rich content product pages and category landing pages.
              You can easily put pages together using content components.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconAppFeatures} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h4'>App features</Typography>
            <Typography variant='body1'>
              Let users install your shop on their home screen or taskbar. GraphCommerce® offers a
              reliable browsing experience even if the data signal is flaky.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconPwa} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h4'>Progressive Web App</Typography>
            <Typography variant='body1'>
              Be amongst the first to qualify as a PWA, Google’s newly set (ranking) standard for
              bringing a native app-like experience to the web.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconOptimizedPerformance} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h4'>Optimized performance</Typography>
            <Typography variant='body1'>
              GraphCommerce® helps you score green Core Web Vitals with little to no effort, thanks
              to built-in features like static generation, bundled JS, viewport URL prefetching and
              more.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconSeo} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h4'>Search engine friendly</Typography>
            <Typography variant='body1'>
              Every shop built with GraphCommerce® can be effortlessly optimized for SEO, featuring
              best practices for canonicals, schema.org, meta data, sitemap.xml and more.
            </Typography>
          </div>
          <div>
            <SvgImage src={iconJumpstart} alt='box' loading='eager' size='extralarge' />
            <Typography variant='h4'>Jumpstart every project</Typography>
            <Typography variant='body1'>
              Start every project with a framework that feels like an app. You build on top of
              production-quality defaults for drawer interfaces, floatable buttons, on-page mega
              menus and more.
            </Typography>
          </div>
        </div>
      </Container>
    </Container>
  )
}
