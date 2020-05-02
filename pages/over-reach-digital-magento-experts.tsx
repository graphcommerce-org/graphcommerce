import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { StaticPageVariables } from '../lib/staticParams'
import RowHeroVideoBackground from '../components/RowHero/RowHeroVideoBackground'
import RowColumnThree from '../components/RowColumnThree'
import { ContentRowProps } from '../components/ContentRenderer/ContentRenderer'
import RowColumnThreeYellow from '../components/RowColumnThree/RowColumnThreeYellow'
import RowColumnTwoSpread from '../components/RowColumnTwo/RowColumnTwoSpread'
import RowColumnOneAwards from '../components/RowColumnOne/RowColumnOneAwards'

const FirstRowYellow: React.FC<GQLRowColumnThreeFragment & ContentRowProps> = ({
  index,
  ...props
}) => {
  return index === 1 ? <RowColumnThreeYellow {...props} /> : <RowColumnThree {...props} />
}

const AboutUs: PageWithLayoutFull = ({ page }) => {
  return (
    <ContentRenderer
      content={page.content}
      renderers={{
        RowHero: RowHeroVideoBackground,
        RowColumnTwo: RowColumnTwoSpread,
        RowColumnOne: RowColumnOneAwards,
        RowColumnThree: FirstRowYellow,
      }}
    />
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
