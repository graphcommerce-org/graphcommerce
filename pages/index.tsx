import React from 'react'
import { Link, GraphCmsPage } from '../graphcms'
import { GQLLocale } from '../generated/graphql'
import { FullLayout } from '../layout'

const Home: GraphCmsPage = props => {
  const { childs } = props
  return (
    <>
      <div>
        Children:
        {childs.map(child => (
          <div key={child!.url!}>
            <Link href={child!.url!} metaRobots={child!.metaRobots}>
              {child?.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

Home.getLayout = FullLayout

export default Home

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async () => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/', GQLLocale.Nl)
}
