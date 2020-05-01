import React from 'react'
import { Typography, makeStyles, Theme } from '@material-ui/core'
import Link from '../Link'
import Asset from '../Asset'
import { vpCalc, UseStyles } from '../Theme'

const useStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      position: 'relative',
      fontSize: 20,
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
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    href: {
      textDecoration: 'none !important',
    },
    link: {
      textDecoration: 'underline',
    },
  }),
  { name: 'BlogListItem' },
)

type BlogListItemProps = GQLBlogListItemFragment & UseStyles<typeof useStyles>

const BlogListItem: React.FC<BlogListItemProps> = (props) => {
  const { title, url, metaRobots, releaseDate, asset, locale } = props
  const classes = useStyles(props)

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={url} metaRobots={metaRobots} className={classes.href}>
      <div className={classes.item}>
        <div className={classes.imageContainer}>
          {asset ? (
            <Asset asset={asset} className={classes.image} width={179} />
          ) : (
            <div className={classes.placeholder}>GEEN AFBEELDING</div>
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
