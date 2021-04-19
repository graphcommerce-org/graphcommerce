import { makeStyles, Link as MuiLink } from '@material-ui/core'
import PageLink from 'next/link'
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
    <PageLink href={url} passHref>
      <MuiLink color='inherit' underline='always' className={classes.link}>
        {title}
      </MuiLink>
    </PageLink>
  )
}
