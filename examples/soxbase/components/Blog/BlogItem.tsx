import { useQuery } from '@apollo/client'
import { Typography, makeStyles, Theme, Link } from '@material-ui/core'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import PageLink from 'next/link'
import Asset from '../Asset'
import { BlogItemFragment } from './BlogItem.gql'

export const useBlogListItemStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      display: 'grid',
      gridTemplateRows: `${responsiveVal(140, 220)} auto auto`,
      alignContent: 'start',
      color: theme.palette.text.primary,
      gap: theme.spacings.sm,
      marginBottom: theme.spacings.sm,
    },
    date: {
      display: 'inline-block',
      textDecoration: 'none',
      color: 'rgb(0, 0, 0, 0.3)',
    },
    asset: {
      display: 'grid',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
      '& p': {
        alignSelf: 'center',
        justifySelf: 'center',
      },
      background: 'rgb(0, 0, 0, 0.08)',
    },
    title: {
      ...theme.typography.h3,
    },
  }),
  { name: 'BlogListItem' },
)

export type BlogItemProps = BlogItemFragment

export default function BlogListItem(props: BlogItemProps) {
  const { title, url, asset, date } = props
  const classes = useBlogListItemStyles(props)
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={classes.item}>
      <PageLink href={`/${url}`} passHref>
        <Link color='inherit'>
          <div className={classes.asset}>
            {asset ? (
              <Asset asset={asset} width={328} />
            ) : (
              <Typography variant='body2'>No Image</Typography>
            )}
          </div>
        </Link>
      </PageLink>
      <time className={classes.date} dateTime={date}>
        {formatter.format(new Date(date))}
      </time>

      <PageLink href={`/${url}`} passHref>
        <Link href={`/${url}`} className={classes.title} color='inherit'>
          <Typography component='h2' variant='h4' color='inherit'>
            {title}
          </Typography>
        </Link>
      </PageLink>
    </div>
  )
}
