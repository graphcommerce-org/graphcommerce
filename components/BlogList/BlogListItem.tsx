import React from 'react'
import { Typography, Theme, makeStyles } from '@material-ui/core'
import Link from '../Link'
import Asset from '../Asset'

const useStyles = makeStyles({
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
})

const BlogListItem: React.FC<GQLBlogListItemFragment> = ({
  title,
  url,
  metaRobots,
  documentInStages,
  asset,
  locale,
}) => {
  const classes = useStyles()
  const publishedAt = documentInStages?.[0]?.publishedAt

  const publishedAtFormatted = new Date(publishedAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={url} metaRobots={metaRobots!}>
      {asset ? (
        <Asset asset={asset} className={classes.image} width={179} />
      ) : (
        <div>GEEN AFBEELDING GEK</div>
      )}
      <Typography component='h2'>{title}</Typography>
      {publishedAtFormatted}
    </Link>
  )
}

export default BlogListItem
