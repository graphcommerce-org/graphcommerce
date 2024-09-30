import { Queryalgolia_searchSingleIndexArgs, QueryproductsArgs } from '@graphcommerce/graphql-mesh'

// eslint-disable-next-line @typescript-eslint/require-await
export async function getCategoryResultsInput(
  args: QueryproductsArgs,
): Promise<Queryalgolia_searchSingleIndexArgs['input']> {
  return {
    query: args.search ?? '',
    hitsPerPage: args.pageSize ? args.pageSize : 10,
    page: args.currentPage ? args.currentPage - 1 : 0,
  }
}
