import { makeStyles } from '@material-ui/styles'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { PageLinkFragment } from './PageLink.gql'

const useStyles = makeStyles({
  link: {
    color: 'inherit',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
  },
})

type PageLinkProps = PageLinkFragment

export default function Link(props: PageLinkProps) {
  const { title, url } = props
  const classes = useStyles()

  return (
    <NextUiPageLink href={url}>
      <a href={url} className={classes.link}>
        {title}
      </a>
    </NextUiPageLink>
  )
}
