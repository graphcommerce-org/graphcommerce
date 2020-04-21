import React from 'react'
import { GetStaticProps } from 'next'
import { makeStyles } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
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

const AboutUs: PageWithLayoutFull<GQLGetPortfolioListQuery> = ({ pages }) => {
  return (
    <>
      <ContentRenderer content={pages[0].content} customRenderers={{ RowHero }} />
    </>
  )
}

AboutUs.layout = LayoutFull

export default AboutUs

export const getStaticProps: GetStaticProps<GQLGetPageLayoutQuery> = async () => {
  const params: StaticPageVariables = {
    url: '/over-reach-digital-magento-experts',
    locale: 'nl',
  }
  const getStaticData = await import('../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
