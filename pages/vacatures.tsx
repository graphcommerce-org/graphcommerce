import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { StaticPageVariables } from '../lib/staticParams'
import { useHeaderSpacing } from '../components/Header'
import VacancyList from '../components/VacancyList'

const Vacancies: PageWithLayoutFull<GQLGetVacancyListQuery> = ({ page, vacancyPosts }) => {
  const header = useHeaderSpacing()

  return (
    <div className={header.marginTop}>
      <div>
        <h2>HELLO</h2>
      </div>
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
  const params: StaticPageVariables = { url: '/vacatures', locale: 'nl' }

  const data = await Promise.all([
    import('../components/PageLayout').then(({ getStaticProps: get }) => get(params)),
    import('../components/VacancyList').then(({ getStaticProps: get }) => get(params)),
  ])

  return { props: Object.assign(...data) }
}
