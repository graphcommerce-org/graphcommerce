import React from 'react'
import { makeStyles, Container, Theme } from '@material-ui/core'
import VacancyListItem from './VacancyListItem'
import { vpCalc } from '../Theme'
import { GQLGetStaticProps } from '../../lib/staticParams'

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
      {vacancyPosts.map((item) => (
        <VacancyListItem key={item.id} {...item} className={classes.item} />
      ))}
    </Container>
  )
}

export default VacancyList

export const getStaticProps: GQLGetStaticProps<GQLGetVacancyListQuery> = async (variables) => {
  const { default: client } = await import('../../lib/apollo')
  const { GetVacancyListDocument } = await import('../../generated/apollo')
  const { data } = await client().query<GQLGetVacancyListQuery, GQLGetVacancyListQueryVariables>({
    query: GetVacancyListDocument,
    variables: { url: `${variables.url}/`, locale: variables.locale },
  })
  return data
}
