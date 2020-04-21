import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import Link from '../Link'
import Asset from '../Asset'

const useStyles = makeStyles({
  item: {
    position: 'relative',
    fontSize: 20,
    marginBottom: '75px',
  },
  title: {
    color: '#000',
    fontSize: '25px',
    fontWeight: 500,
    lineHeight: '1.68',
    letterSpacing: '-0.0375em',
    margin: '0 0 30px',
  },
  date: {
    display: 'inline-block',
    color: '#b8b8b8',
    marginBottom: '30px',
  },
  imageContainer: {
    display: 'block',
    position: 'relative',
    marginBottom: '50px',
    height: '200px',
    '&::before': {
      content: '""',
      height: '100%',
      width: '100%',
      position: 'absolute',
      display: 'block',
      zIndex: '-1',
      boxShadow: '0 30px 60px 0 rgba(0, 0, 0, 0.25)',
      transform: 'scale(.85, 0.95)',
    },
  },
  placeholder: {
    display: 'flex',
    textAlign: 'center',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.7em',
    color: '#fff',
    backgroundColor: '#10e4ad',
    fontWeight: 600,
    userSelect: 'none',
  },
  image: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  href: {
    textDecoration: 'none !important',
  },
  link: {
    textDecoration: 'underline',
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
    <Link href={url} metaRobots={metaRobots!} className={classes.href}>
      <div className={classes.item}>
        <div className={classes.imageContainer}>
          {asset ? (
            <Asset asset={asset} className={classes.image} width={180} height={120} />
          ) : (
            <div className={classes.placeholder}>GEEN AFBEELDING</div>
          )}
        </div>
        <div className={classes.date}>{publishedAtFormatted}</div>
        <Typography component='h4' className={classes.title}>
          {title}
        </Typography>
        <div className={classes.link}>Lees meer</div>
      </div>
    </Link>
  )
}

export default BlogListItem
