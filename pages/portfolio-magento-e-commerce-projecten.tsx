import React from 'react'
import { GetStaticProps } from 'next'
import { makeStyles } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import PortfolioList from '../components/PortfolioList'
import { StaticPageVariables } from '../lib/staticParams'
import RichText from '../components/RichText'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})

const RowHero: React.FC<GQLRowHeroFragment> = ({ text }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <RichText {...text} />
    </div>
  )
}

const Portfolio: PageWithLayoutFull<GQLGetPortfolioListQuery> = ({ pages, portfolioList }) => {
  return (
    <>
      <ContentRenderer content={pages[0].content} customRenderers={{ RowHero }} />
      <PortfolioList portfolioList={portfolioList} />
    </>
  )
}

Portfolio.layout = LayoutFull

export default Portfolio

export const getStaticProps: GetStaticProps<
  GQLGetPageLayoutQuery & GQLGetPortfolioListQuery
> = async () => {
  const params: StaticPageVariables = {
    url: '/portfolio-magento-e-commerce-projecten',
    locale: 'nl',
  }

  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/PortfolioList/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: Object.assign(...data) }
}
