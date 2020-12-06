import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import PageLink from '../PageLink'
import { RowHeroBannerFragment } from './RowHeroBanner.gql'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
    maxHeight: 'calc(100vh - 100px)',
  },
  copy: {
    color: '#fff',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 1,
    padding: `0 ${theme.spacings.xs}`,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
  },
  asset: {
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      height: 'auto',
    },
  },
  button: {
    border: '1px solid red',
  },
}))

const useRichTextOne = makeStyles((theme: Theme) => ({
  h1: {
    color: 'transparent',
    textTransform: 'uppercase',
    WebkitTextStroke: '1.2px #fff',
    maxWidth: '70%',
    textAlign: 'center',
    fontSize: responsiveVal(40, 90),
    [theme.breakpoints.up('md')]: {
      fontSize: responsiveVal(4, 80),
      maxWidth: '100%',
    },
  },
}))

export default function RowHeroBanner(props: RowHeroBannerFragment) {
  const { copy, asset, pageLinks } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false}>
      <div className={classes.wrapper}>
        <div className={classes.copy}>
          <RichText classes={richTextOneClasses} {...copy} />
          {pageLinks.map((pageLink) => (
            <PageLink key={pageLink.url} {...pageLink} />
          ))}
        </div>
        <video src={asset.url} autoPlay muted loop playsInline className={classes.asset} />
      </div>
    </Container>
  )
}
