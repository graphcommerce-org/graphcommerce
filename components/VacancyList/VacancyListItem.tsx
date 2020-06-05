import React from 'react'
import { Typography, makeStyles, Theme } from '@material-ui/core'
import { LinkProps } from 'next/link'
import Link from '../Link'
import { vpCalc, UseStyles } from '../Theme'

export const useVacancyListItemStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      display: 'block',
      height: '100%',
      backgroundColor: '#fff',
      padding: theme.spacings.lg,
      boxShadow: theme.shadows[24],
      transform: 'translateY(0)',
      transition: 'transform 0.2s ease-in-out',

      '&:hover, &:focus, &:active': {
        transform: 'translateY(-3px)',
      },
    },
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      header: {
        flexDirection: 'row',
      },
    },
    title: {
      color: theme.palette.primary.contrastText,
      ...theme.typography.h3,
      margin: `0 0 ${theme.spacings.sm}`,
      lineHeight: vpCalc(26, 34),
      marginRight: 20,
    },
    status: {
      ...theme.typography.body1,
      fontWeight: 500,
      marginBottom: vpCalc(20, 30),
    },
    label: {
      borderRadius: '4px',
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      padding: '2px 10px',
    },
    notavailable: {
      borderRadius: '4px',
      border: '1px solid #e53935',
      padding: '2px 10px',
      color: '#e53935',
    },
    perks: {
      listStyle: 'none',
      paddingLeft: 0,
      margin: 0,

      '& li': {
        ...theme.typography.body1,
        position: 'relative',
        paddingLeft: 35,
        lineHeight: vpCalc(19, 25),
        marginBottom: '10px',

        '&:before': {
          content: '""',
          display: 'inline-block',
          height: 18,
          width: 8,
          position: 'absolute',
          top: 2,
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
  const { title, url, metaRobots, locale, content } = props
  const classes = useVacancyListItemStyles(props)

  const status = content[0].vacancystatus ? content[0].vacancystatus : 'leeg'
  let statusLabel = ''
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

  return (
    <Link href={url} metaRobots={metaRobots} underline='none' color='inherit'>
      <div className={classes.item}>
        <div className={classes.header}>
          <Typography component='h3' className={classes.title}>
            {title}
          </Typography>
          {statusLabel && (
            <div className={classes.status}>
              {isAvailable ? (
                <div className={classes.label}>{statusLabel}</div>
              ) : (
                <div className={classes.notavailable}>{statusLabel}</div>
              )}
            </div>
          )}
        </div>
        <ul className={classes.perks}>
          {content[0]?.perks && content[0].perks.map((item, key) => <li key={key}>{item}</li>)}
        </ul>
      </div>
    </Link>
  )
}

export default VacancyListItem
