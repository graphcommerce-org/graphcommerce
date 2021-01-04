import { Typography, makeStyles, Theme, Link } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { BlogListItemFragment } from './BlogListItem.gql'

export const useBlogListItemStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      color: '#000000',
      position: 'relative',
      ...theme.typography.body1,
    },
    title: {
      ...theme.typography.h3,
      margin: `0 0 ${theme.spacings.sm}`,
    },
    date: {
      display: 'inline-block',
      textDecoration: 'none',
      color: 'rgb(0, 0, 0, 0.3)',
      marginBottom: theme.spacings.sm,
    },
    imageContainer: {
      display: 'block',
      position: 'relative',
      marginBottom: '50px',
      height: responsiveVal(120, 200),
      '&::before': {
        content: '""',
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'block',
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
      color: 'rgb(0, 0, 0, 0.3)',
      backgroundColor: 'rgb(0, 0, 0, 0.08)',
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

export type BlogListItemProps = BlogListItemFragment

export default function BlogListItem(props: BlogListItemProps) {
  const { title, url, asset, publishedAt } = props
  const classes = useBlogListItemStyles(props)
  const locale = 'en-US'

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/${url}`} className={classes.item}>
      <div className={classes.imageContainer}>
        {asset ? (
          <img src={asset.url} alt='' className={classes.image} />
        ) : (
          <div className={clsx(classes.placeholder, classes.image)}>No image</div>
        )}
      </div>
      <time className={classes.date} dateTime={publishedAt}>
        {formatter.format(new Date(publishedAt))}
      </time>
      <Typography component='h2' variant='h4' className={classes.title}>
        {title}
      </Typography>
      <div className={classes.link}>Read more</div>
    </Link>
  )
}
