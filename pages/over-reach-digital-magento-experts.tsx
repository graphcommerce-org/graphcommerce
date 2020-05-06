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
import RowColumnOneCentered from '../components/RowColumnOne/RowColumnOneCentered'
import RowColumnOne from '../components/RowColumnOne'
import TriangleBg from '../components/TriangleBg'

const FirstRowYellow: React.FC<GQLRowColumnThreeFragment & ContentRowProps> = ({
  index,
  ...props
}) => {
  return index === 1 ? <RowColumnThreeYellow {...props} /> : <RowColumnThree {...props} />
}

const CustomRowColumnOneRenderers: React.FC<
  GQLRowColumnOneFragment & ContentRowProps & GQLGetRowColumOneAwardsQuery
> = ({ index, ...props }) => {
  if (index === 4) {
    return <RowColumnOneAwards {...props} />
  }
  if (index === 6) {
    return (
      <TriangleBg color='white' gradient halfWidth>
        <RowColumnOneCentered {...props} />
      </TriangleBg>
    )
  }
  return <RowColumnOne {...props} />
}

const AboutUs: PageWithLayoutFull = ({ page }) => {
  return (
    <ContentRenderer
      content={page.content}
      renderers={{
        RowHero: RowHeroVideoBackground,
        RowColumnTwo: RowColumnTwoSpread,
        RowColumnOne: CustomRowColumnOneRenderers,
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
  return { props: { ...(await get(params)), headerTheme: 'on-green' } }
}
