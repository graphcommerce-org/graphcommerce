import { BlogTitle as NextBlogTitle } from '@reachdigital/next-ui'

export default function BlogHeader(props) {
  const { title } = props

  return <NextBlogTitle title={title} />
}
