import { Button, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { SvgImage, responsiveVal } from '@reachdigital/next-ui'
import { iconUspCheck } from '../../Theme/icons/icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      background: '#F3F5F7',
    },
    container: {
      padding: `${responsiveVal(50, 200)} 0`,
      display: 'grid',
      gridTemplateAreas: `
      "copy graphic"
      "usps graphic"
    `,
      gridTemplateColumns: 'minmax(400px, 700px) minmax(200px, 450px)',
      columnGap: theme.spacings.md,
      justifyContent: 'space-between',
    },
    copy: {
      gridArea: 'copy',
      margin: `0 0 ${responsiveVal(30, 80)} 0`,
    },
    grid: {
      display: 'grid',
      gridArea: 'usps',
      gridTemplateColumns: `repeat(2, minmax(200px, 300px))`,
      justifyContent: 'space-between',
      columnGap: responsiveVal(20, 50),
      rowGap: responsiveVal(20, 50),
      '& > *': {
        display: 'grid',
        gridTemplateColumns: `50px auto`,
        alignItems: 'center',
      },
    },
    phone: {
      width: '100%',
      aspectRatio: '450/900',
      border: '1px solid #bbb',
      gridArea: 'graphic',
      justifySelf: 'end',
      borderRadius: 60,
      margin: `${responsiveVal(30, 80)} 0 0 0`,
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

        <div className={classes.phone}></div>

        <div className={classes.grid}>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>Hybrid Static Site Generation (SSG)</Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>Page-based Javascript bundling and splitting</Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>CSS critical rendering path</Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>Advanced CDN serving both assets and pages</Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>Image and font rendering and download optimization</Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>Fetch only required data using GraphQL</Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>Viewport URL prefetching</Typography>
          </div>
          <div>
            <SvgImage src={iconUspCheck} alt='box' loading='eager' size='medium' />
            <Typography variant='h4'>Long-term browser caching, even between builds</Typography>
          </div>
        </div>
      </Container>
    </Container>
  )
}
