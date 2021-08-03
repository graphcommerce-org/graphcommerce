import { Chip, makeStyles, Theme, Link } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      maxWidth: 800,
      margin: `0 auto`,
      marginBottom: theme.spacings.sm,
    },
    tag: {
      marginRight: 8,
      borderRadius: 4,
      fontSize: 14,
    },
  }),
  { name: 'BlogTitle' },
)

export type blogTagsProps = UseStyles<typeof useStyles> & {
  tags: []
}

export default function BlogTitle(props: blogTagsProps) {
  const { tags } = props
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      {tags.map((tag) => (
        <PageLink key={tag} href='' passHref>
          <Chip label={tag} className={classes.tag} />
        </PageLink>
      ))}
    </div>
  )
}
