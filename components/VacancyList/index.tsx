import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'
import { useHeaderSpacing } from 'components/Header'
import clsx from 'clsx'
import VacancyListItem from './VacancyListItem'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      backgroundColor: theme.palette.primary.main,
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
    <div className={classes.wrapper}>
      <Container
        maxWidth='lg'
        className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom, classes.root)}
      >
        <div className={classes.vacancyList}>
          {vacancyPosts && vacancyPosts.map((item) => <VacancyListItem key={item.id} {...item} />)}
        </div>
      </Container>
    </div>
  )
}

export default VacancyList
