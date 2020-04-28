import React from 'react'
import { GetStaticProps } from 'next'
import { makeStyles, Container } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
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

const AboutUs: PageWithLayoutFull<GQLGetPortfolioListQuery> = ({ page }) => {
  return (
    <Container maxWidth='lg'>
      <ContentRenderer content={page.content} customRenderers={{ RowHero }} />
    </Container>
  )
}

AboutUs.layout = LayoutFull

export default AboutUs

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = {
    url: '/over-reach-digital-magento-experts',
    locale: 'nl',
  }
  const { getStaticProps: get } = await import('../components/PageLayout')
  return { props: await get(params) }
}
