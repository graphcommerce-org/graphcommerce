import React from 'react'
import { GQLLocale } from '../generated/graphql'
import LayoutFull, {
  getStaticProps as getPageLayoutData,
  PageLayoutProps,
} from '../components/PageLayout'
import { getStaticProps as getBreadcrumbData } from '../components/Breadcrumb'
import ContentRenderer from '../components/ContentRenderer'
import { GetStaticProps } from '../lib/getStaticProps'
import { LayoutPage } from '../lib/layout'

const Home: LayoutPage<PageLayoutProps> = ({ pages }) => {
  return <ContentRenderer content={pages[0].content} />
}

Home.layout = LayoutFull

export default Home

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params = { url: '/', locale: GQLLocale.Nl }

  // todo(paales): Make generic, currently I don't know how to merge the types
  // The objects are generic and I want props to become PageLayoutProps
  const data = await Promise.all([
    getPageLayoutData().then((obj) => obj.default({ params })),
    getBreadcrumbData().then((obj) => obj.default({ params })),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
