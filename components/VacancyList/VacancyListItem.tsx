import React from 'react'
import { Typography, makeStyles, Theme, LinkProps } from '@material-ui/core'
import Link from '../Link'
import Asset from '../Asset'
import { vpCalc, UseStyles } from '../Theme'

export const useVacancyListItemStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      display: 'block',
      height: '100%',
      textDecoration: 'none',
      color: '#000',
      backgroundColor: '#fff',
      padding: vpCalc(24, 75),
      boxShadow: '0 2px 15px 0 rgba(0, 0, 0, 0.04), 0 60px 70px -20px rgba(0, 0, 0, 0.14)',
      transform: 'translateY(0)',
      transition: 'transform 0.2s ease-in-out',
    },
    title: {
      color: theme.palette.primary.contrastText,
      ...theme.typography.h3,
      margin: `0 0 ${theme.spacings.sm}`,
    },

    link: {
      textDecoration: 'underline',
    },
  }),
  { name: 'VacancyListItem' },
)

type VacancyListItemProps = GQLVacancyListItemFragment &
  UseStyles<typeof useVacancyListItemStyles> &
  LinkProps

const VacancyListItem: React.FC<VacancyListItemProps> = (props) => {
  const { title, url, metaRobots, createdAt, asset, locale, metaDescription, ...linkProps } = props
  const classes = useVacancyListItemStyles(props)

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={url} metaRobots={metaRobots} underline='none' {...linkProps}>
      <div className={classes.item}>
        <Typography component='h3' className={classes.title}>
          {title}
        </Typography>
        <div>
          <Typography component='p'>{metaDescription}</Typography>
        </div>
        <div className={classes.link}>Lees meer</div>
      </div>
    </Link>
  )
}

export default VacancyListItem
