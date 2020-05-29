import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'
import { useHeaderSpacing } from 'components/Header'
import clsx from 'clsx'
import VacancyListItem from './VacancyListItem'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'relative',
    },
    bg: {
      position: 'absolute',
      zIndex: -1,
      width: '100vw',
      height: '100%',
      margin: '0 auto',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: theme.palette.primary.main,
      boxSizing: 'content-box',
    },
    list: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
    item: {
      flex: '1 0 100%',
      marginBottom: vpCalc(24, 75),
    },
    [theme.breakpoints.up(1024)]: {
      item: {
        flex: `0 0 calc(50% - ${vpCalc(24, 75)} /2)`,
        '&:nth-child(2n)': {
          marginLeft: vpCalc(24, 75),
        },
      },
    },
  }),
  { name: 'VacancyList' },
)

const VacancyList: React.FC<GQLGetVacancyListQuery> = ({ vacancyPosts }) => {
  const classes = useStyles()
  const headerSpacing = useHeaderSpacing()

  return (
    <Container maxWidth='lg' className={clsx(headerSpacing.paddingTop, classes.root)}>
      <div className={classes.list}>
        {vacancyPosts &&
          vacancyPosts.map((item) => (
            <VacancyListItem key={item.id} {...item} className={classes.item} />
          ))}
      </div>
      <span
        className={classes.background}
        className={clsx(headerSpacing.top, headerSpacing.paddingBottomInverse, classes.bg)}
      />
    </Container>
  )
}

export default VacancyList
