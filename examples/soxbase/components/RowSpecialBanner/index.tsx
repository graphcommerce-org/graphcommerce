import { Container, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import Asset from '../Asset'
import { RowSpecialBannerFragment } from './RowSpecialBanner.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
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
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
    copy: {
      color: theme.palette.text.primary,
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
    url: {
      ...theme.typography.body2,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h4,
      },
      color: theme.palette.text.primary,
    },
  }),
  { name: 'RowSpecialBanner' },
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

type RowSpecialBannerProps = RowSpecialBannerFragment

export default function RowSpecialBanner(props: RowSpecialBannerProps) {
  const { copy, asset, topic, pageLinks } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.asset}>
          <Asset asset={asset} width={328} />
        </div>

        <div className={classes.copy}>
          {topic && (
            <Typography variant='body2' className={classes.topic}>
              {topic}
            </Typography>
          )}
          <RichText classes={richTextOneClasses} {...copy} />
          {pageLinks.map((pageLink) => (
            <NextUiPageLink href={pageLink.url} key={pageLink.url}>
              <a href={pageLink.url} className={classes.url}>
                {pageLink.title}
              </a>
            </NextUiPageLink>
          ))}
        </div>
      </div>
    </Container>
  )
}
