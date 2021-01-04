import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { RowBlogContentFragment } from './RowBlogContent.gql'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: `${theme.spacings.lg}`,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  },
  wrapper: {
    maxWidth: 800,
    margin: `0 auto ${theme.spacings.xl} auto`,
  },
}))

export default function RowBlogContent(props: RowBlogContentFragment) {
  const { content } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <RichText {...content} />
      </div>
    </Container>
  )
}
