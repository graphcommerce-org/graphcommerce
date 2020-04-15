import React from 'react'
import PortfolioListItem from './PortfolioListItem'

const PortfolioList: React.FC<GQLGetPortfolioListQuery> = ({ portfolioList }) => {
  return (
    <div>
      {portfolioList.map((portfolioItem) => (
        <PortfolioListItem key={portfolioItem.id} {...portfolioItem} />
      ))}
    </div>
  )
}

export default PortfolioList
