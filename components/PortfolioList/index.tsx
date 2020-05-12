import React from 'react'
import { makeStyles, Theme, Container } from '@material-ui/core'
import { GQLGetStaticProps } from 'lib/staticParams'
import { vpCalc } from 'components/Theme'
import PortfolioListItem from './PortfolioListItem'

const useStyles = makeStyles(
  (theme: Theme) => ({
    portfolioList: {
      display: 'grid',
      gridColumnGap: theme.gridSpacing.column,
      gridRowGap: theme.gridSpacing.row,
      gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(260, 500)}, 1fr))`,
    },
  }),
  { name: 'PortfolioList' },
)

const PortfolioList: React.FC<GQLGetPortfolioListQuery> = ({ portfolioList }) => {
  const classes = useStyles()
  return (
    <Container className={classes.portfolioList}>
      {portfolioList.map((portfolioItem) => (
        <PortfolioListItem key={portfolioItem.id} {...portfolioItem} />
      ))}
    </Container>
  )
}

export default PortfolioList

export const getStaticProps: GQLGetStaticProps<GQLGetPortfolioListQuery> = async ({
  url,
  locale,
}) => {
  const { default: client } = await import('lib/apollo')
  const { GetPortfolioListDocument } = await import('generated/apollo')
  const { data } = await client().query<GQLGetPortfolioListQuery, GQLGetPageLayoutQueryVariables>({
    query: GetPortfolioListDocument,
    variables: { url: `${url}/`, locale },
  })
  return data
}
