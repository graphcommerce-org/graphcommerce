import { Chip } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { makeStyles } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'BlogTitle' })((theme) => ({
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
}))

export default function BlogTitle(props) {
  const { relatedPages } = props
  const { classes } = useStyles()

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
