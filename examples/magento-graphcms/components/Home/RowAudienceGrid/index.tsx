import { responsiveVal } from '@graphcommerce/next-ui'
import { Button, Container, makeStyles, Theme, Typography } from '@material-ui/core'

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
        width: '800px',
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
      borderRadius: 6,
      color: theme.palette.primary.dark,
      fontWeight: 550,
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
  }),
  { name: 'RowFeatureGrid' },
)

export default function RowAudienceGrid() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.copy}>
          <Typography variant='overline' component='div' gutterBottom color='primary'>
            Happy teams
          </Typography>
          <Typography variant='h2' gutterBottom>
            Bringing back agility to agile e-commerce development
          </Typography>
          <Typography paragraph variant='h5' color='textSecondary'>
            Building projects with GraphCommerce® offers benefits that make shop and product owners,
            designers, marketeers and management very happy.
          </Typography>
        </div>

        <div className={classes.grid}>
          <div>
            <div className={classes.icon}>CEO</div>
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
          <Button variant='outlined' size='large' className={classes.copyButton}>
            https://graphcommerce.vercel.app/
          </Button>
        </div>
      </Container>
    </div>
  )
}
