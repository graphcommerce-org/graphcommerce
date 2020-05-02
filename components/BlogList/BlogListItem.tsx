import React from 'react'
import { Typography, makeStyles, Theme, LinkProps } from '@material-ui/core'
import Link from '../Link'
import Asset from '../Asset'
import { vpCalc, UseStyles } from '../Theme'

export const useBlogListItemStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      position: 'relative',
      ...theme.typography.body1,
    },
    title: {
      color: theme.palette.primary.contrastText,
      ...theme.typography.h4,
      margin: `0 0 ${theme.spacings.sm}`,
    },
    date: {
      display: 'inline-block',
      color: '#b8b8b8',
      marginBottom: theme.spacings.sm,
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
        top: 0,
        left: 0,
      },
      paddingTop: 'calc(100% / 3 * 2)',
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
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    link: {
      textDecoration: 'underline',
    },
  }),
  { name: 'BlogListItem' },
)

type BlogListItemProps = GQLBlogListItemFragment &
  UseStyles<typeof useBlogListItemStyles> &
  LinkProps

const BlogListItem: React.FC<BlogListItemProps> = (props) => {
  const { title, url, metaRobots, releaseDate, asset, locale, ...linkProps } = props
  const classes = useBlogListItemStyles(props)

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={url} metaRobots={metaRobots} underline='none' {...linkProps}>
      <div className={classes.item}>
        <div className={classes.imageContainer}>
          {asset ? (
            <Asset asset={asset} className={classes.image} width={179} />
          ) : (
            <div className={`${classes.placeholder} ${classes.image}`}>GEEN AFBEELDING</div>
          )}
        </div>
        <time className={classes.date} dateTime={releaseDate}>
          {formatter.format(new Date(releaseDate))}
        </time>
        <Typography component='h4' className={classes.title}>
          {title}
        </Typography>
        <div className={classes.link}>Lees meer</div>
      </div>
    </Link>
  )
}

export default BlogListItem
