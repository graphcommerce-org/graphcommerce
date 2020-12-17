import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import PageLinkUrl from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import Link from '../PageLink/Link'
import { RowSpecialBannerFragment } from './RowSpecialBanner.gql'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: `${theme.spacings.lg}`,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  },
  wrapper: {
    display: 'grid',
    height: '60vw',
    gridTemplateColumns: '1fr 1fr',
    justifyItems: 'center',
    columnGap: `${theme.spacings.lg}`,
    [theme.breakpoints.up('md')]: {
      height: '50vw',
      columnGap: `${theme.spacings.lg}`,
    },
  },
  asset: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  copy: {
    color: '#000',
    display: 'grid',
    alignContent: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
    },
    '& > *': {
      maxWidth: 'max-content',
    },
  },
  topic: {
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.7)',
  },
}))

const useRichTextOne = makeStyles((theme: Theme) => ({
  h2: {
    textTransform: 'uppercase',
    maxWidth: '80%',
    color: '#000',
    WebkitTextStroke: '0.9px #000',
    fontSize: responsiveVal(18, 50),
    marginTop: responsiveVal(8, 20),
    marginBottom: responsiveVal(18, 20),
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: '0.9px #000',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: responsiveVal(18, 60),
      maxWidth: '100%',
      WebkitTextStroke: '1.2px #000',
    },
  },
  paragraph: {
    color: 'red',
  },
}))

type RowSpecialBanner = RowSpecialBannerFragment

export default function RowSpecialBanner(props: RowSpecialBanner) {
  const { copy, asset, topic, pageLinks } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        {asset.mimeType === 'video/mp4' ? (
          <video src={asset.url} autoPlay muted loop playsInline className={classes.asset} />
        ) : (
          <img src={asset.url} className={classes.asset} alt='' />
        )}
        <div className={classes.copy}>
          {topic ? <span className={classes.topic}>{topic}</span> : false}
          <RichText classes={richTextOneClasses} {...copy} />
          {pageLinks.map((pageLink) => (
            <Link key={pageLink.url} {...pageLink} />
          ))}
        </div>
      </div>
    </Container>
  )
}
