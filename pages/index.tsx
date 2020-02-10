import React from 'react'
import { GraphCmsPageProps, Link } from '../graphcms'
import { GQLLocale } from '../generated/graphql'

const Home: React.FC<GraphCmsPageProps> = props => {
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

export default Home

// eslint-disable-next-line @typescript-eslint/camelcase
export const unstable_getStaticProps = async (): Promise<{ props: GraphCmsPageProps }> => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/', GQLLocale.Nl)
}
