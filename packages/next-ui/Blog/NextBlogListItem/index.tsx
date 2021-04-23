import { Link, makeStyles, Theme, Typography } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
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
  { name: 'NextBlogListItem' },
)

export type NextBlogListItemProps = UseStyles<typeof useStyles> & {
  asset: React.ReactNode
  url: string
  Date: (dateClasses) => React.ReactElement
  title: string
}

export default function NextBlogListItem(props: NextBlogListItemProps) {
  const { asset, url, Date, title } = props
  const classes = useStyles(props)

  return (
    <div className={classes.item}>
      <PageLink href={`/${url}`} passHref>
        <Link color='inherit'>
          <div className={classes.asset}>{asset}</div>
        </Link>
      </PageLink>

      <Date {...classes} />

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
