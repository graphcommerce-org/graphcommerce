import { createExecutor, type MeshContext, type Resolvers } from '@graphcommerce/graphql-mesh'
import { AllDynamicRowsDocument, AllDynamicRowsQuery } from '../graphql/AllDynamicRows.gql'
import { DynamicRowsDocument } from '../graphql/DynamicRows.gql'
import { applyDynamicRows, matchCondition } from '../lib/hygraphDynamicRows'

async function getAllHygraphDynamicRows(
  context: MeshContext,
  options: { pageSize?: number; ttl: number },
) {
  const { pageSize = 100, ttl } = options

  const execute = createExecutor(context)

  const query = execute(AllDynamicRowsDocument, { variables: { first: 100, skip: 0 }, ttl })

  const pages: Promise<AllDynamicRowsQuery>[] = [query]
  const data = await query
  const totalPages = Math.ceil(data.dynamicRowsConnection.aggregate.count / pageSize) ?? 1
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(
        execute(AllDynamicRowsDocument, {
          variables: { first: pageSize, skip: pageSize * (i - 1) },
          ttl,
        }),
      )
    }
  }

  return (await Promise.all(pages))
    .map((q) => q.dynamicRowsConnection.edges)
    .flat(1)
    .map(({ node }) => ({ id: node.id, conditions: node.conditions }))
}

export const resolvers: Resolvers = {
  Page: {
    content: async (parent, args, context, info) => {
      const execute = createExecutor(context)
      const allRoutes = await getAllHygraphDynamicRows(context, { ttl: 60 * 60 })

      const rowIds = allRoutes
        .filter((availableDynamicRow) =>
          availableDynamicRow.conditions.some((condition) =>
            matchCondition(condition, { ...parent, ...args }),
          ),
        )
        .map((row) => row.id)

      const dynamicRows =
        rowIds.length !== 0
          ? await execute(DynamicRowsDocument, { variables: { rowIds }, ttl: 60 * 60 })
          : undefined

      if (!dynamicRows?.dynamicRows) return parent.content

      return applyDynamicRows(dynamicRows.dynamicRows, parent.content)
    },
  },
}
