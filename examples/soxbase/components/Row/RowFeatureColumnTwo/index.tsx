import { Button, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { SvgImage, responsiveVal } from '@reachdigital/next-ui'
import {
  iconLogoFormium,
  iconLogoAdobe,
  iconLogoGraphcms,
  iconLogoMagento,
} from '../../Theme/icons/icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: '#001727',
    },
    container: {
      padding: `${responsiveVal(50, 200)} 0`,
      display: 'grid',
      gridTemplateAreas: `
      "copy"
      "graphic"
      "services"
    `,
      gridTemplateColumns: '80%',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `
      "copy graphic"
      "services services"
    `,
        gridTemplateColumns: 'minmax(400px, 700px) minmax(200px, 700px)',
        justifyContent: 'space-between',
      },
      columnGap: theme.spacings.md,
      rowGap: responsiveVal(20, 120),
    },
    copy: {
      gridArea: 'copy',
    },
    phone: {
      width: '100%',
      aspectRatio: '5/4',
      background: '#021F34',
      gridArea: 'graphic',
      justifySelf: 'end',
      borderRadius: 10,
      margin: `0`,
    },
    services: {
      gridArea: 'services',
      display: 'grid',
      justifyContent: 'center',
      '& > div': {
        margin: `${responsiveVal(10, 20)} 0`,
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: 30,
        justifyItems: 'center',
      },
    },
    styledButton: {
      marginTop: responsiveVal(20, 30),
      '& > span': {
        ...theme.typography.overline,
        textTransform: 'none',
        margin: '0 !important',
      },
    },
  }),
  { name: 'RowFeatureColumnTwo' },
)

export default function RowFeatureColumnTwo() {
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.copy}>
          <Typography variant='overline'>Compose your backend</Typography>
          <Typography variant='h2' color='secondary'>
            Infinite services in a single endpoint
          </Typography>
          <Typography paragraph variant='h3' color='textSecondary'>
            At the heart of GraphCommerce® is our GraphQL Mesh, which consolidates data from
            different services. To date, Magento Open Source, Adobe Commerce, GraphCMS (rich
            content) and Formium (form creation) have been fully integrated.
          </Typography>
          <Button href='/' variant='text' size='large' className={classes.styledButton}>
            Explore GraphQL Mesh →
          </Button>
        </div>

        <div className={classes.phone}></div>

        <div className={classes.services}>
          <Typography paragraph variant='h5' color='secondary'>
            Integrated services that can be queried with a single call
          </Typography>
          <div>
            <SvgImage src={iconLogoMagento} alt='box' loading='eager' size='large' />
            <SvgImage src={iconLogoAdobe} alt='box' loading='eager' size='large' />
            <SvgImage src={iconLogoGraphcms} alt='box' loading='eager' size='large' />
            <SvgImage src={iconLogoFormium} alt='box' loading='eager' size='large' />
          </div>
        </div>
      </Container>
    </Container>
  )
}
