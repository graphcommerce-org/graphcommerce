import { SvgImage, responsiveVal } from '@graphcommerce/next-ui'
import { Button, Container, makeStyles, Theme, Typography, useTheme } from '@material-ui/core'
import Asset from '../../Asset'
import {
  iconApollo,
  iconFramermotion,
  iconGraphql,
  iconMaterialui,
  iconNextjs,
  iconReact,
  iconTypescript,
} from '../../Theme/icons/icons.tsx'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      overflow: 'hidden',
      background: '#001727',
      backgroundImage: 'radial-gradient(ellipse at 110% 10%, #4EB6D2 0%, #84D0C4 36%, #001727 60%)',
    },
    container: {
      padding: `${responsiveVal(50, 200)} 0`,
      display: 'grid',
      gridTemplateAreas: `
      "copy"
      "graphic"
      "usps"
      "services"
    `,
      gridTemplateColumns: '80%',
      justifyContent: 'center',
      rowGap: responsiveVal(30, 120),
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `
      "copy graphic"
      "usps graphic"
      "services services"
    `,
        gridTemplateColumns: 'minmax(400px, 650px) minmax(300px, 650px)',
        justifyContent: 'space-between',
      },
      columnGap: theme.spacings.md,
    },
    copy: {
      gridArea: 'copy',
      zIndex: 1,
    },
    grid: {
      margin: 0,
      padding: 0,
      display: 'grid',
      gridArea: 'usps',
      justifyContent: 'space-between',
      columnGap: responsiveVal(10, 20),
      '& > *': {
        display: 'grid',
        gridTemplateColumns: `40px auto`,
        alignItems: 'center',
        marginBottom: '0.4em',
      },
    },
    description: {
      opacity: 0.65,
    },
    h6: {
      opacity: 0.65,
    },
    img: {
      position: 'relative',
      height: '50vh',
      '& > *': {
        position: 'absolute',
        width: 'calc(50vh * (3248/2100))',
      },
      [theme.breakpoints.up('md')]: {
        width: '100%',
        '& > *': {
          position: 'absolute',
          width: '200%',
        },
      },
      gridArea: 'graphic',
      // justifySelf: 'end',
    },
    styledButton: {
      borderRadius: responsiveVal(4, 14),
      background: '#001727',
      fontSize: responsiveVal(15, 19),
      lineHeight: 1.4,
      fontWeight: 600,
      marginTop: responsiveVal(20, 30),
      padding: `${responsiveVal(4, 10)} ${responsiveVal(10, 20)}`,
      '&:before': {
        content: '""',
        position: 'absolute',
        left: '-2px',
        top: '-2px',
        background: 'linear-gradient(45deg,  #CEFF99 0%, #85FFFC 90%,  #85FFFC 100%)',
        width: 'calc(100% + 4px)',
        height: 'calc(100% + 4px)',
        zIndex: '-1',
        borderRadius: responsiveVal(6, 16),
      },
      '& > span': {
        ...theme.typography.overline,
        textTransform: 'none',
        margin: '0 !important',
      },
    },
    technology: {
      gridArea: 'services',
      display: 'grid',
      justifyContent: 'start',
      justifyItems: 'start',
      '& > div': {
        margin: `${responsiveVal(10, 20)} 0`,
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: responsiveVal(10, 70),
        justifyItems: 'start',
      },
    },
  }),
  { name: 'RowListColumnTwo' },
)

export default function RowListColumnTwo() {
  const classes = useStyles()
  const theme = useTheme()
  const screenshot = {
    url: '/screenshot.png',
    width: 3248,
    height: 2100,
    mimeType: 'image/jpeg',
  }

  return (
    <Container maxWidth={false} className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.copy}>
          <Typography variant='overline' component='div' gutterBottom color='primary'>
            Developers, developers, developers
          </Typography>
          <Typography variant='h2' gutterBottom>
            Amazing developer experience
          </Typography>
          <Typography paragraph variant='h5' color='textSecondary' className={classes.description}>
            GraphCommerce® has been developed by developers, for developers. It is built on the best
            open-source tools for the modern web, used by millions, and subject to continuous
            innovation by the largest developer communities in the world.
          </Typography>

          <Button href='/' variant='contained' size='large' className={classes.styledButton}>
            View documentation
          </Button>
        </div>

        <div className={classes.img}>
          <Asset asset={screenshot} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
        </div>

        <ul className={classes.grid}>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Realtime feedback in your IDE with typescript
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Fast refresh provides instant feedback during development
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Fully configured Webpack requires none of your time
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Validate your code on build time with Typescript to prevent failing builds
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Discover the GraphQL schema with GraphQL Playground
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Zero-maintenance hosting via Vercel
            </Typography>
          </li>

          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Standardized advanced form handling
            </Typography>
          </li>

          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              File system routing
            </Typography>
          </li>

          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Easily themable component library designed for e-commerce
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Declarative, 60fps animations using Framer Motion
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Auto-generated Typescript definitions from GraphQL schema queries
            </Typography>
          </li>
          <li>
            <Typography variant='overline'>›_</Typography>
            <Typography variant='h6' className={classes.h6}>
              Query multiple backend services with Apollo Client and GraphQL Mesh
            </Typography>
          </li>
        </ul>

        <div className={classes.technology}>
          <Typography paragraph variant='h5'>
            Build with the tools you already know and love
          </Typography>
          <div>
            <SvgImage src={iconReact} alt='box' loading='eager' size='large' />
            <SvgImage src={iconTypescript} alt='box' loading='eager' size='large' />
            <SvgImage src={iconGraphql} alt='box' loading='eager' size='large' />
            <SvgImage src={iconApollo} alt='box' loading='eager' size='large' />
            <SvgImage src={iconNextjs} alt='box' loading='eager' size='large' />
            <SvgImage src={iconMaterialui} alt='box' loading='eager' size='large' />
            <SvgImage src={iconFramermotion} alt='box' loading='eager' size='large' />
          </div>
        </div>
      </Container>
    </Container>
  )
}
