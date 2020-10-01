import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GetCategoryStaticPathsDocument } from 'generated/documents'

const getCategoryStaticPaths = async (client: ApolloClient<NormalizedCacheObject>) => {
  const { data } = await client.query({ query: GetCategoryStaticPathsDocument })

  type Category = { children?: Array<Category | null> | null; url_key?: string | null }
  const extractChildren = (category?: Category | null, baseUrl = '') => {
    if (!category) return []

    const url = category.url_key ? `${baseUrl}/${category.url_key ?? ''}` : baseUrl
    const children = category.children?.map((value) => extractChildren(value, url)) ?? []

    return url ? [`${url}`, ...children] : children
  }

  const paths =
    data?.categories?.items
      ?.map((category) => extractChildren(category))
      .flat(10)
      .filter((v) => !!v)
      .map((url) => ({
        params: { url: url.split('/').filter((v: string) => !!v) as string[] },
      })) ?? []

  return { paths, fallback: true } as const
}

export default getCategoryStaticPaths
