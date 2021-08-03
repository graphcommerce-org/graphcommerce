import { Chip, makeStyles, Theme, Link } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      maxWidth: 800,
      margin: `0 auto`,
    },
    tag: {
      marginRight: 10,
    },
  }),
  { name: 'BlogTitle' },
)

export type blogTagsProps = UseStyles<typeof useStyles> & {
  tags: string
}

export default function BlogTitle(props: blogTagsProps) {
  const { tags } = props
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      {tags.map((tag) => (
        <PageLink key={tag} href='' passHref>
          <Link color='inherit' className={classes.tag}>
            <Chip label={tag} />
          </Link>
        </PageLink>
      ))}
    </div>
  )
}
