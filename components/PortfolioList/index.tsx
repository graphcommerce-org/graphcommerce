import React from 'react'
import { makeStyles, Theme, Container } from '@material-ui/core'
import PortfolioListItem from './PortfolioListItem'
import { vpCalc } from '../Theme'

const useStyles = makeStyles((theme: Theme) => ({
  portfolioList: {
    display: 'grid',
    gridColumnGap: theme.gridSpacing.column,
    gridRowGap: theme.gridSpacing.row,
    gridTemplateColumns: `repeat(auto-fill, minmax(${vpCalc(260, 500)}, 1fr))`,
  },
}))

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
