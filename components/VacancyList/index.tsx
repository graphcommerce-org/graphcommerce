import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'
import VacancyListItem from './VacancyListItem'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      paddingTop: vpCalc(104, 250),
      paddingBottom: vpCalc(48, 160),
      background: theme.palette.primary.dark,
      position: 'relative',
      overflow: 'hidden',
      top: `calc(${vpCalc(73, 155)} * -1)`,
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

  return (
    <div className={classes.root}>
      <Container maxWidth='lg'>
        <div className={classes.list}>
          {vacancyPosts &&
            vacancyPosts.map((item) => (
              <VacancyListItem key={item.id} {...item} className={classes.item} />
            ))}
        </div>
      </Container>
    </div>
  )
}

export default VacancyList
