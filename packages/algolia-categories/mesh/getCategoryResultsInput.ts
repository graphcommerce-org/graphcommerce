import type {
  Queryalgolia_searchSingleIndexArgs,
  QuerycategoryListArgs,
} from '@graphcommerce/graphql-mesh'

// eslint-disable-next-line @typescript-eslint/require-await
export async function getCategoryResultsInput(
  args: QuerycategoryListArgs,
): Promise<Queryalgolia_searchSingleIndexArgs['input']> {
  return {
    query: args.filters?.name?.match ?? '',
    hitsPerPage: args.pageSize ? args.pageSize : 10,
    page: args.currentPage ? args.currentPage - 1 : 0,
  }
}
