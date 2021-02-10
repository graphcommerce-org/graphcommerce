import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import Button from '../PageLink/Button'
import { RowProductBackstoryFragment } from './RowProductBackstory.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.lg}`,
      [theme.breakpoints.up('md')]: {
        marginBottom: `${theme.spacings.xl}`,
      },
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: `${theme.spacings.md}`,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '8fr 3fr',
      },
    },
    backstory: {
      position: 'relative',
    },
    copy: {
      color: '#fff',
      display: 'grid',
      justifyItems: 'start',
      alignContent: 'end',
      padding: `${theme.spacings.md}`,
      '& > *': {
        maxWidth: 'max-content',
      },
      [theme.breakpoints.up('md')]: {
        background: 'none',
        width: '60%',
        minHeight: '100vh',
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
        width: '50%',
      },
    },
    asset: {
      position: 'absolute',
      top: '0',
      zIndex: -1,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'brightness(80%)',
      [theme.breakpoints.up('md')]: {
        filter: 'brightness(100%)',
        height: '100%',
      },
    },
    img: {
      maxWidth: '100%',
    },
  }),
  { name: 'RowProductBackstory' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  paragraph: {
    textTransform: 'uppercase',
    maxWidth: '100%',
    fontWeight: 600,
    textAlign: 'left',
    fontSize: responsiveVal(11, 20),
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
      fontSize: responsiveVal(16, 34),
    },
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: '1.2px #fff',
    },
  },
}))

export default function RowProductBackstory(props: RowProductBackstoryFragment) {
  const { copy, asset } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.backstory}>
          <div className={classes.copy}>
            <RichText classes={richTextOneClasses} {...copy} />
          </div>
          <img src={asset.url} className={classes.asset} alt='' />
        </div>
        <div>
          <img
            src='https://media.graphcms.com/OQQl44iJRdODZ8hGBqvv'
            alt=''
            className={classes.img}
          />
        </div>
      </div>
    </Container>
  )
}
