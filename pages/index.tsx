import { Link, GraphCmsPage } from '../graphcms'
import { GQLLocale } from '../generated/graphql'
import { FullLayout } from '../layout/FullLayout'

const Home: GraphCmsPage = props => {
  const { childs } = props
  return (
    <>
      <div>
        Test Change Children:
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

Home.layout = FullLayout

export default Home

export const getStaticProps = async () => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/', GQLLocale.Nl)
}
