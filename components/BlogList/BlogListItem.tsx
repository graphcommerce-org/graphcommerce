import React from 'react'
import { Typography } from '@material-ui/core'
import Link from '../Link'

const BlogListItem: React.FC<GQLBlogListItemFragment> = ({
  title,
  url,
  metaRobots,
  documentInStages,
}) => {
  const publishedAt = documentInStages?.[0]?.publishedAt

  return (
    <Link href={url} metaRobots={metaRobots!}>
      <Typography component='h2'>{title}</Typography>
      {publishedAt}
    </Link>
  )
}

export default BlogListItem
