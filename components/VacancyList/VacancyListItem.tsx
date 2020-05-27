import React from 'react'
import { Typography, makeStyles, Theme, LinkProps } from '@material-ui/core'
import Link from '../Link'
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
  const { title, url, metaRobots, locale, content, ...linkProps } = props
  const classes = useVacancyListItemStyles(props)

  const status = content[0].vacancystatus ? content[0].vacancystatus : 'leeg'
  let statusLabel = ''
  let labelClass = ''

  switch (status) {
    case 'FRESH': {
      statusLabel = 'Nieuw'
      labelClass = 'classes.fresh'
      break
    }
    case 'RENEWED': {
      statusLabel = 'Vernieuwd'
      labelClass = 'classes.renewed'
      break
    }
    case 'NOT_AVAILABLE': {
      statusLabel = 'Niet meer beschikbaar'
      labelClass = 'classes.notavailable'
      break
    }
    default: {
      break
    }
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={url} metaRobots={metaRobots} underline='none' {...linkProps}>
      <div className={classes.item}>
        <div>
          <div className={labelClass}>{statusLabel}</div>
          <Typography component='h3' className={classes.title}>
            {title}
          </Typography>
        </div>
        <ul>
          {content[0] && content[0].perks ? content[0].perks.map((item) => <li>{item}</li>) : ''}
        </ul>
      </div>
    </Link>
  )
}

export default VacancyListItem
