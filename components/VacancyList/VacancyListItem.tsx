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
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    title: {
      color: theme.palette.primary.contrastText,
      ...theme.typography.h3,
      margin: `0 0 ${theme.spacings.sm}`,
      lineHeight: vpCalc(26, 34),
      marginRight: 20,
    },
    status: {
      display: 'inline-block',
      fontSize: 20,
      fontWeight: 500,
    },
    [theme.breakpoints.down(768)]: {
      status: {
        fontSize: 14,
        marginBottom: 20,
      },
      header: {
        flexDirection: 'column',
      },
    },
    label: {
      '&:not(:empty)': {
        borderRadius: '4px',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        padding: '2px 10px',
      },
    },
    notavailable: {
      '&:not(:empty)': {
        borderRadius: '4px',
        border: `1px solid ${theme.palette.tertiary.red}`,
        padding: '2px 10px',
        color: theme.palette.tertiary.red,
      },
    },

    link: {
      textDecoration: 'underline',
    },
    perks: {
      listStyle: 'none',
      paddingLeft: 0,
      margin: 0,

      '& li': {
        position: 'relative',
        paddingLeft: 35,
        fontSize: 'calc(13.6px + 0.45vw)',
        lineHeight: 'calc(18px + 0.45vw)',
        marginBottom: '10px',

        '&:before': {
          content: '""',
          display: 'inline-block',
          height: 18,
          width: 8,
          position: 'absolute',
          left: 5,
          transform: 'rotate(45deg)',
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          borderRight: `2px solid ${theme.palette.primary.main}`,
        },
      },
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
  const labelClass = 'classes.label'
  let isAvailable = true

  switch (status) {
    case 'FRESH': {
      statusLabel = 'Nieuw'
      break
    }
    case 'RENEWED': {
      statusLabel = 'Vernieuwd'
      break
    }
    case 'NOT_AVAILABLE': {
      statusLabel = 'Niet meer beschikbaar'
      isAvailable = false
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
        <div className={classes.header}>
          <Typography component='h3' className={classes.title}>
            {title}
          </Typography>
          <div className={classes.status}>
            {isAvailable ? (
              <div className={classes.label}>{statusLabel}</div>
            ) : (
              <div className={classes.notavailable}>{statusLabel}</div>
            )}
          </div>
        </div>
        <ul className={classes.perks}>
          {content[0] && content[0].perks ? content[0].perks.map((item) => <li>{item}</li>) : ''}
        </ul>
      </div>
    </Link>
  )
}

export default VacancyListItem
