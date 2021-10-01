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
        width: '700px',
      },
    },
    grid: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: `repeat(auto-fill, minmax(150px, 280px))`,
      justifyContent: 'center',
      columnGap: responsiveVal(50, 180),
      margin: `0 0 ${responsiveVal(100, 140)} 0`,
      rowGap: responsiveVal(50, 100),
      '& > *': {
        display: 'grid',
        gridTemplateRows: `auto auto 1fr`,
      },
    },
    share: {
      display: 'grid',
      justifyContent: 'center',
      justifyItems: 'center',
      margin: `0 auto ${responsiveVal(50, 200)} auto`,
      textAlign: 'center',
    },
    copyButton: {
      borderRadius: responsiveVal(5, 15),
      fontSize: responsiveVal(14, 17),
      padding: `${responsiveVal(2, 8)} ${responsiveVal(20, 38)}`,
      fontFamily: 'Menlo,ui-monospace,SFMono-Regular,monospace',
      borderColor: '#00172720',
      background: '#00172710',
      marginTop: responsiveVal(6, 10),
    },
    icon: {
      justifySelf: 'start',
      padding: `${responsiveVal(0, 2)} ${responsiveVal(4, 8)}`,
      marginBottom: responsiveVal(6, 10),
      backgroundImage: 'linear-gradient(45deg, #E9FAF6, #F6FFEB)',
      borderRadius: responsiveVal(4, 10),
      '& > *': {
        margin: 0,
        fontSize: responsiveVal(10, 15),
        backgroundImage: 'none',
        '-webkit-background-clip': 'initial',
        '-moz-background-clip': 'initial',
        '-webkit-text-fill-color': 'initial',
        '-moz-text-fill-color': 'initial',
      },
    },
    overline: {
      filter: 'brightness(0.9)',
    },
  }),
  { name: 'RowFeatureGrid' },
)

export default function RowAudienceGrid() {
  const classes = useStyles()

  return (
    <Container maxWidth={false}>
      <Container>
        <div className={classes.copy}>
          <Typography variant='overline' className={classes.overline}>
            Happy teams
          </Typography>
          <Typography variant='h2'>
            Bringing back agility to agile e-commerce development
          </Typography>
          <Typography paragraph variant='h3' color='textSecondary'>
            Building projects with GraphCommerce® offers benefits that make shop and product owners,
            designers, marketeers and management very happy.
          </Typography>
        </div>

        <div className={classes.grid}>
          <div>
            <div className={classes.icon}>
              <Typography variant='overline' paragraph>
                CEO
              </Typography>
            </div>
            <Typography variant='h4'>Consolidate your resources</Typography>
            <Typography variant='body1' color='textSecondary'>
              Let users install your shop on their home screen or taskbar. GraphCommerce® offers a
              reliable browsing experience even if the data signal is flaky.
            </Typography>
          </div>
          <div>
            <div className={classes.icon}>
              <Typography variant='overline' paragraph>
                CFO
              </Typography>
            </div>
            <Typography variant='h4'>Serverless hosting architecture</Typography>
            <Typography variant='body1' color='textSecondary'>
              The GraphCommerce® PWA is lightweight and doesn’t need much in terms of hosting. We
              deploy it on top of (zero config) serverless hosting platform Vercel.
            </Typography>
          </div>
          <div>
            <div className={classes.icon}>
              <Typography variant='overline' paragraph>
                DEV
              </Typography>
            </div>
            <Typography variant='h4'>API first</Typography>
            <Typography variant='body1' color='textSecondary'>
              GraphCommerce allows for API-first development. Every frontend feature can be built
              with mockup API data and therefore frontend developers can work independently from
              their backend colleagues.
            </Typography>
          </div>
          <div>
            <div className={classes.icon}>
              <Typography variant='overline' paragraph>
                PO
              </Typography>
            </div>
            <Typography variant='h4'>Every feature a testable URL</Typography>
            <Typography variant='body1' color='textSecondary'>
              Every git branch is deployed on a unique URL. You can preview and test features while
              building. Builds are killed when merging to the master branch.
            </Typography>
          </div>
          <div>
            <div className={classes.icon}>
              <Typography variant='overline' paragraph>
                DESIGN
              </Typography>
            </div>
            <Typography variant='h4'>Designers, be free</Typography>
            <Typography variant='body1' color='textSecondary'>
              E-commerce has a way of forcing very recognizable design choices. With GraphCommerce®,
              designers have complete freedom in creating the ultimate user experience.
            </Typography>
          </div>
          <div>
            <div className={classes.icon}>
              <Typography variant='overline' paragraph>
                CEO
              </Typography>
            </div>
            <Typography variant='h4'>No vendor lock-in</Typography>
            <Typography variant='body1' color='textSecondary'>
              GraphCommerce® is built on open-source industry standards. All the commercial backend
              services that have been implemented offer a free plan to set up shop with ease.
            </Typography>
          </div>
        </div>
        <div className={classes.share}>
          <Typography paragraph variant='h5'>
            Want to show GraphCommerce® to your team members?
          </Typography>
          <Button
            href='/'
            variant='outlined'
            size='large'
            className={classes.copyButton}
            color='primary'
          >
            $ npm install graphcommerce
          </Button>
        </div>
      </Container>
    </Container>
  )
}
