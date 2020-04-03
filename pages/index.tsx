import React from 'react'
import { Link, GraphCmsPage } from '../graphcms'
import { GQLLocale } from '../generated/graphql'
import { FullLayout } from '../layout/FullLayout'
import { ContentRenderer } from '../components/ContentRenderer'

const Home: GraphCmsPage = (props) => {
  const { childs, page } = props
  return (
    <>
      <div>
        {childs.map((child) => (
          <div key={child.url}>
            <Link href={child.url} metaRobots={child.metaRobots!}>
              {child.title}
            </Link>
          </div>
        ))}
      </div>

      <ContentRenderer content={page.content} />
    </>
  )
}

Home.layout = FullLayout

export default Home

export const getStaticProps = async () => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/', GQLLocale.Nl)
}
