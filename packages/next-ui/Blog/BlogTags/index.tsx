import { Chip, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
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
  const { relatedPages } = props
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      {relatedPages.map((page) => (
        <PageLink key={page.url} href={`/${page.url}`} passHref>
          <Chip label={page.title} className={classes.tag} />
        </PageLink>
      ))}
    </div>
  )
}
