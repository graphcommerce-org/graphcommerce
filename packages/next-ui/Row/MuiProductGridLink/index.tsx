import { Link, LinkProps, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    url: {
      ...theme.typography.body1,
      fontWeight: 400,
      color: theme.palette.text.primary,
    },
  }),
  {
    name: 'MuiProductGridLink',
  },
)

type RowLinkProps = UseStyles<typeof useStyles> & {
  url: string
  title: string
} & LinkProps

export default function MuiProductGridLink(props: RowLinkProps) {
  const { url, title, ...linkProps } = props
  const classes = useStyles(props)

  return (
    <Link href={url} className={classes.url} underline='always' {...linkProps}>
      {title}
    </Link>
  )
}
