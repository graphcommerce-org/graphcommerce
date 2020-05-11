import React from 'react'
import { GetStaticProps } from 'next'
import { makeStyles } from '@material-ui/core'
import LayoutFull, {
  PageWithLayoutFull,
  PageLayoutProps,
  getStaticProps as getPageLayout,
} from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import PortfolioList, { getStaticProps as getPortfolioList } from 'components/PortfolioList'
import { StaticPageVariables } from 'lib/staticParams'
import RichText from 'components/RichText'
import { useHeaderSpacing } from 'components/Header'

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

const Portfolio: PageWithLayoutFull<GQLGetPortfolioListQuery> = ({ page, portfolioList }) => {
  const header = useHeaderSpacing()

  return (
    <div className={header.marginTop}>
      <ContentRenderer content={page.content} renderers={{ RowHero }} />
      <PortfolioList portfolioList={portfolioList} />
    </div>
  )
}

Portfolio.layout = LayoutFull

export default Portfolio

export const getStaticProps: GetStaticProps<
  PageLayoutProps & GQLGetPortfolioListQuery
> = async () => {
  const params: StaticPageVariables = {
    url: '/portfolio-magento-e-commerce-projecten',
    locale: 'nl',
  }
  const data = await Promise.all([getPageLayout(params), getPortfolioList(params)])
  return { props: Object.assign(...data) }
}
