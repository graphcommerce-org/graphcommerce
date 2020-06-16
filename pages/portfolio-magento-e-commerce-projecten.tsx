import React from 'react'
import { GetStaticProps } from 'next'
import { makeStyles, Theme } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import PortfolioList from 'components/PortfolioList'
import { StaticPageVariables } from 'node/staticParams'
import RichText from 'components/RichText'
import { useHeaderSpacing } from 'components/Header'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import getPortfolioListProps from 'components/PortfolioList/getPortfolioListProps'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    maxWidth: 880,
    padding: `${theme.spacings.xl} ${theme.spacings.md}`,
    margin: '0 auto',
  },
}))

const useRichTextStyles = makeStyles((theme: Theme) => ({
  h1: { fontWeight: 'normal' },
}))

const RowHero: React.FC<GQLRowHeroFragment> = ({ text }) => {
  const richTextClassesAdded = useRichTextStyles()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <RichText {...text} classes={{ ...richTextClassesAdded }} />
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
  const data = await Promise.all([getPageLayoutProps(params), getPortfolioListProps(params)])
  return { props: Object.assign(...data) }
}
