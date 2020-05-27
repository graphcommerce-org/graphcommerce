import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import VacancyListItem from './VacancyListItem'

const useStyles = makeStyles(
  (theme: Theme) => ({
    vacancyList: {
      display: 'flex',
      flexFlow: 'row wrap',
    },
    item: {
      flex: '0 0 50%',
    },
  }),
  { name: 'VacancyList' },
)

const VacancyList: React.FC<GQLGetVacancyListQuery> = ({ vacancyPosts }) => {
  const classes = useStyles()

  return (
    <Container maxWidth='lg' className={classes.vacancyList}>
      {vacancyPosts &&
        vacancyPosts.map((item) => (
          <VacancyListItem key={item.id} {...item} className={classes.item} />
        ))}
    </Container>
  )
}

export default VacancyList
