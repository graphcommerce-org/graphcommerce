import { makeStyles, Container, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacings.lg,
  },
  blogheader: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
    maxWidth: 800,
    margin: `0 auto ${theme.spacings.lg} auto`,
  },
  copy: {
    color: '#fff',
    display: 'grid',
    justifyItems: 'end',
    alignContent: 'end',
    padding: `${theme.spacings.lg} ${theme.spacings.md}`,
    minHeight: '30vh',
    '& > *': {
      maxWidth: 'max-content',
    },
    [theme.breakpoints.up('lg')]: {
      padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
    },
  },
  asset: {
    position: 'absolute',
    top: '0',
    zIndex: -1,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(100%)',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
}))

export default function BlogHeader(props) {
  const { asset } = props
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <div className={classes.blogheader}>
        <Typography variant='body1' className={classes.copy} />
        {asset?.url && <img src={asset.url} alt='' className={classes.asset} />}
      </div>
    </Container>
  )
}
