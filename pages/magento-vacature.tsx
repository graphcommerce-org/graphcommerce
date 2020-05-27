import React from 'react'
import { GetStaticProps } from 'next'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import getVacancyListProps from 'components/VacancyList/getVacancyListProps'
import { StaticPageVariables } from 'node/staticParams'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { useHeaderSpacing } from '../components/Header'
import VacancyList from '../components/VacancyList'

const Vacancies: PageWithLayoutFull<GQLGetVacancyListQuery> = ({ page, vacancyPosts }) => {
  const header = useHeaderSpacing()

  return (
    <div className={header.marginTop}>
      <VacancyList vacancyPosts={vacancyPosts} />
      <ContentRenderer content={page.content} />
    </div>
  )
}

Vacancies.layout = LayoutFull

export default Vacancies

export const getStaticProps: GetStaticProps<
  PageLayoutProps & GQLGetVacancyListQuery
> = async () => {
  const params: StaticPageVariables = { url: '/magento-vacature', locale: 'nl' }
  const data = await Promise.all([getPageLayoutProps(params), getVacancyListProps(params)])

  return { props: Object.assign(...data) }
}
