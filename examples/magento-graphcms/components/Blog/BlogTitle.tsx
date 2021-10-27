import { BlogTitle as NextBlogTitle } from '@graphcommerce/next-ui'

type BlogTitleProps = {
  title: string
}

export default function BlogTitle(props: BlogTitleProps) {
  const { title } = props

  return <NextBlogTitle title={title} />
}
