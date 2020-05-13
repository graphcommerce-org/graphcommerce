import React from 'react'
import { makeStyles, Theme, Container } from '@material-ui/core'
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
