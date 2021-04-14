import { Container, Link, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MultiItemSlider from '@reachdigital/next-ui/FramerSlider/variants/MultiItemSlider'
import PageLink from 'next/link'
import { RowContentLinksFragment } from './RowContentLinks.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: 0,
    },
    scroller: {
      padding: `0 ${theme.page.horizontal}`,
      marginBottom: `${theme.spacings.lg}`,
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'start',
      gap: `${theme.spacings.md}`,
      alignContent: 'center',
      '& > *': {
        minWidth: 'max-content',
      },
    },
    title: {
      fontWeight: 600,
    },
  }),
  { name: 'RowContentLinks' },
)

type RowContentLinksProps = RowContentLinksFragment

export default function RowContentLinks(props: RowContentLinksProps) {
  const { title, contentLinks } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.root}>
      <MultiItemSlider classes={{ scroller: classes.scroller }} scrollSnapAlign={false}>
        <Typography variant='body1' component='h4' className={classes.title}>
          {title}
        </Typography>

        {contentLinks.map((contentLink) => (
          <PageLink href={contentLink.url} key={contentLink.url}>
            <Link key={contentLink.url} href={contentLink.url} variant='body1' color='inherit'>
              {contentLink.title}
            </Link>
          </PageLink>
        ))}
      </MultiItemSlider>
    </Container>
  )
}
