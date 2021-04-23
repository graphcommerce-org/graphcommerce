import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
    wrapper: {
      display: 'grid',
      background: 'rgba(0,0,0,0.03)',
      justifyItems: 'center',
      columnGap: `${theme.spacings.lg}`,
      padding: `${theme.spacings.lg} 0`,
      [theme.breakpoints.up('md')]: {
        padding: 0,
        background: 'none',
        gridTemplateColumns: '1fr 1fr',
        // height: '60vw',
        columnGap: `${theme.spacings.lg}`,
      },
    },
    asset: {
      height: '100%',
      width: responsiveVal(250, 900),
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
    copy: {
      color: theme.palette.text.primary,
      maxWidth: '80%',
      display: 'grid',
      alignContent: 'center',
      [theme.breakpoints.up('md')]: {
        maxWidth: '70%',
      },
      '& > *': {
        maxWidth: 'max-content',
      },
    },
    topic: {
      ...theme.typography.caption,
    },
  }),
  { name: 'SpecialBanner' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  h2: {
    textTransform: 'uppercase',
    maxWidth: '80%',
    color: theme.palette.text.primary,
    WebkitTextStroke: `0.9px ${theme.palette.text.primary}`,
    fontSize: responsiveVal(18, 50),
    marginTop: responsiveVal(8, 20),
    marginBottom: responsiveVal(18, 20),
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: `0.9px ${theme.palette.text.primary}`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: responsiveVal(18, 60),
      maxWidth: '100%',
      WebkitTextStroke: `1.2x ${theme.palette.text.primary}`,
    },
  },
}))

type SpecialBannerProps = UseStyles<typeof useStyles & typeof useRichTextOne> & {
  RichContent: (props) => React.ReactElement
  asset: React.ReactNode
  pageLinks?: React.ReactNode
  topic: React.ReactNode
}

export default function SpecialBanner(props: SpecialBannerProps) {
  const { RichContent, asset, topic, pageLinks } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.asset}>{asset}</div>

        <div className={classes.copy}>
          {topic && (
            <Typography variant='body2' className={classes.topic}>
              {topic}
            </Typography>
          )}
          <RichContent classes={richTextOneClasses} />
          {pageLinks}
        </div>
      </div>
    </Container>
  )
}
