import React from 'react'
import { GetStaticProps } from 'next'
import { makeStyles, Container } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { StaticPageVariables } from '../lib/staticParams'
import RowHeroVideoBackground from '../components/RowHero/RowHeroVideoBackground'
import RowColumnThree from '../components/RowColumnThree'
import { ContentRowProps } from '../components/ContentRenderer/ContentRenderer'

const RowColumnThreeYellow: React.FC<GQLRowColumnThreeFragment> = (props) => {
  return (
    <div style={{ backgroundColor: 'red' }}>
      <RowColumnThree {...props} />
    </div>
  )
}

const FirstRowYellow: React.FC<GQLRowColumnThreeFragment & ContentRowProps> = ({
  index,
  ...props
}) => {
  return index === 1 ? <RowColumnThreeYellow {...props} /> : <RowColumnThree {...props} />
}

const AboutUs: PageWithLayoutFull = ({ page }) => {
  return (
    <Container maxWidth='lg'>
      <ContentRenderer
        content={page.content}
        customRenderers={{
          RowHero: RowHeroVideoBackground,
          RowColumnThree: FirstRowYellow,
        }}
      />
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
