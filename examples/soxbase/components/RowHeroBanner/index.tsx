import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import Button from '../PageLink/Button'
import { RowHeroBannerFragment } from './RowHeroBanner.gql'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative',
    height: '70vh',
    [theme.breakpoints.up('lg')]: {
      height: '90vh',
    },
  },
  copy: {
    color: '#fff',
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    display: 'grid',
    justifyItems: 'center',
    alignContent: 'center',
    zIndex: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacings.md}`,
    '& > *': {
      maxWidth: 'max-content',
    },
    [theme.breakpoints.up('md')]: {
      width: '70%',
    },
    [theme.breakpoints.up('lg')]: {
      padding: `0 ${theme.spacings.lg}`,
      width: '60%',
    },
  },
  asset: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
}))

const useRichTextOne = makeStyles((theme: Theme) => ({
  h1: {
    textTransform: 'uppercase',
    maxWidth: '70%',
    textAlign: 'center',
    fontSize: responsiveVal(42, 50),
    marginBottom: responsiveVal(22, 32),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      fontSize: responsiveVal(18, 90),
      maxWidth: '100%',
    },
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: '1.2px #fff',
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
            <Button
              key={pageLink.url}
              {...pageLink}
              variant='outlined'
              size='large'
              color='inherit'
            />
          ))}
        </div>
        <video src={asset.url} autoPlay muted loop playsInline className={classes.asset} />
      </div>
    </Container>
  )
}
