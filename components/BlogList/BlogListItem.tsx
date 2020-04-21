import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import Link from '../Link'
import Asset from '../Asset'
import { theme, vpCalc } from '../Theme'

const useStyles = makeStyles({
  item: {
    position: 'relative',
    fontSize: 20,
    marginBottom: '75px',
  },
  title: {
    color: theme.palette.primary.contrastText,
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
    height: vpCalc(120, 200),
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
    ...theme.typography.body2,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
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
  releaseDate,
  asset,
  locale,
}) => {
  const classes = useStyles()

  const publishedAtFormatted = new Date(releaseDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={url} metaRobots={metaRobots!} className={classes.href}>
      <div className={classes.item}>
        <div className={classes.imageContainer}>
          {asset ? (
            <Asset asset={asset} className={classes.image} width={179} />
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
