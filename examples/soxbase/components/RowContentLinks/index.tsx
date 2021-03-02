import { Container, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MultiItemSlider from '@reachdigital/next-ui/FramerSlider/variants/MultiItemSlider'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { RowContentLinksFragment } from './RowContentLinks.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.lg}`,
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'start',
      gap: `${theme.spacings.md}`,
      alignContent: 'center',
      '& > *': {
        whiteSpace: 'no-wrap',
        minWidth: 'max-content',
      },
    },
    title: {
      ...theme.typography.body1,
      color: theme.palette.text.primary,
      fontWeight: 600,
    },
    url: {
      ...theme.typography.body1,
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
  }),
  { name: 'RowContentLinks' },
)

type RowContentLinksProps = RowContentLinksFragment

export default function RowContentLinks(props: RowContentLinksProps) {
  const { title, contentLinks } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false}>
      <MultiItemSlider classes={{ scroller: classes.container }} scrollSnapAlign='start'>
        <Typography variant='h4' className={classes.title}>
          {title}
        </Typography>

        {contentLinks.map((contentLink) => (
          <NextUiPageLink href={contentLink.url} key={contentLink.url}>
            <a key={contentLink.url} href={contentLink.url} className={classes.url}>
              {contentLink.title}
            </a>
          </NextUiPageLink>
        ))}
      </MultiItemSlider>
    </Container>
  )
}
