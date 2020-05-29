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
    vacancyList: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(260, 500)}, 1fr))`,
    },
  }),
  { name: 'VacancyList' },
)

const VacancyList: React.FC<GQLGetVacancyListQuery> = ({ vacancyPosts }) => {
  const classes = useStyles()
  const headerSpacing = useHeaderSpacing()

  return (
    <Container
      maxWidth='lg'
      className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom, classes.root)}
    >
      <div className={classes.vacancyList}>
        {vacancyPosts && vacancyPosts.map((item) => <VacancyListItem key={item.id} {...item} />)}
      </div>
      <span className={clsx(headerSpacing.top, headerSpacing.paddingBottomInverse, classes.bg)} />
    </Container>
  )
}

export default VacancyList
