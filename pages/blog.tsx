import { GQLLocale } from '../generated/graphql'
import { Link, GraphCmsPage } from '../graphcms'
import { FullLayout } from '../layout/FullLayout'
import styles from './blog.module.css'

const Blog: GraphCmsPage = props => {
  const { page, childs } = props
  return (
    <>
      <h1>{page.metaTitle}</h1>
      <div className={styles.gridList}>
        {childs.map(child => (
          <div key={child.url}>
            <Link href={child.url} metaRobots={child.metaRobots!}>
              {child.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

Blog.layout = FullLayout

export default Blog

export const getStaticProps = async () => {
  const { getProps } = await import('../graphcms/ssg')
  return getProps('/blog', GQLLocale.Nl)
}
