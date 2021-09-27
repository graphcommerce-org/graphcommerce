import { BlogTitle as NextBlogTitle } from '@graphcommerce/next-ui'

export default function BlogHeader(props) {
  const { title } = props

  return <NextBlogTitle title={title} />
}
