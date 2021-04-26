import { Link as MuiLink, makeStyles } from '@material-ui/core'
import PageLink from 'next/link'
import { UseStyles } from '../Styles'

const useStyles = makeStyles({
  link: {
    color: 'inherit',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
  },
})

type NextPageLinkProps = UseStyles<typeof useStyles> & {
  title: string
  url: string
}

export default function NextPageLink(props: NextPageLinkProps) {
  const { title, url } = props
  const classes = useStyles(props)

  return (
    <PageLink href={url} passHref>
      <MuiLink color='inherit' underline='always' className={classes.link}>
        {title}
      </MuiLink>
    </PageLink>
  )
}
