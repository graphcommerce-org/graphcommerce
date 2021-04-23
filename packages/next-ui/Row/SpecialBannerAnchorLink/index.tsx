import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    url: {
      ...theme.typography.body2,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h4,
      },
      color: theme.palette.text.primary,
    },
  }),
  { name: 'SpecialBannerAnchorLink' },
)

type SpecialBannerAnchorLinkProps = UseStyles<typeof useStyles> & {
  href: string
  title: string
}

export default function SpecialBannerAnchorLink(props: SpecialBannerAnchorLinkProps) {
  const { href, title } = props
  const classes = useStyles(props)

  return (
    <a href={href} className={classes.url}>
      {title}
    </a>
  )
}
