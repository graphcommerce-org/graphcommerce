import { Chip, makeStyles, Theme } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'

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

export default function BlogTitle(props) {
  const { blogTags } = props
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      {blogTags.map((tag) => {
        const lowercaseTag = String(tag).toLowerCase()

        return (
          <PageLink key={tag} href={`/blog/tagged/${lowercaseTag}`}>
            <Chip label={tag} className={classes.tag} />
          </PageLink>
        )
      })}
    </div>
  )
}
