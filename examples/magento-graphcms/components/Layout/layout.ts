import { ParsedUrlQuery } from 'querystring'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { hasProps } from '@graphcommerce/next-ui/server'
import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { LayoutDocument, LayoutQuery } from './Layout.gql'

/**
 * Wraps the getStaticProps function to provide the correct storefrontConfig().
 *
 * - This method will have plugins, see the @graphcommerce/next-ui/server.interceptor.tsx file for all
 *   configured plugins.
 *
 * To get the current storefront config, use the `storefrontConfig()` function.
 */
export function layoutProps<
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends ParsedUrlQuery = ParsedUrlQuery,
>(
  cb: GetStaticProps<Props, Params>,
): (context: GetStaticPropsContext<Params>) => Promise<GetStaticPropsResult<Props>> {
  return async (
    context: GetStaticPropsContext<Params>,
  ): Promise<GetStaticPropsResult<Props & LayoutQuery>> => {
    const layout = graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })
    const result = await cb(context)

    if (hasProps(result))
      return {
        ...result,
        props: { ...result.props, ...(await layout).data },
      }
    return result
  }
}
