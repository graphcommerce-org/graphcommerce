/* eslint-disable @typescript-eslint/require-await */
import { getProduct } from '@graphcommerce/graphcms-ui/mesh/resolvers'
import {
  createDocumentExecutor,
  type MeshContext,
  type Resolvers,
} from '@graphcommerce/graphql-mesh'
import type { GraphQLResolveInfo } from 'graphql'
import { AllDynamicRowsDocument, AllDynamicRowsQuery } from '../graphql/AllDynamicRows.gql'
import { DynamicRowsDocument } from '../graphql/DynamicRows.gql'
import { applyDynamicRows, matchCondition } from '../lib/hygraphDynamicRows'

async function getAllHygraphDynamicRows(
  context: MeshContext,
  options: { pageSize?: number; ttl: number },
  parent: object,
  info: GraphQLResolveInfo,
) {
  const { pageSize = 100, ttl } = options

  const execute = createDocumentExecutor(context, parent, info)

  const query = execute(AllDynamicRowsDocument, {
    variables: { first: 100, skip: 0 },
    ttl,
    headers: ['gcms-stage', 'gcms-locale'],
  })

  const pages: Promise<AllDynamicRowsQuery>[] = [query]
  const data = await query
  const totalPages = Math.ceil(data.dynamicRowsConnection.aggregate.count / pageSize) ?? 1
  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(
        execute(AllDynamicRowsDocument, {
          variables: { first: pageSize, skip: pageSize * (i - 1) },
          ttl,
          headers: ['gcms-stage', 'gcms-locale'],
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
  // Page: {
  //   rows: {
  //     resolve: async (parent, args, context, info) => {
  //       const execute = createDocumentExecutor(context, parent, info)
  //       const allRoutes = await getAllHygraphDynamicRows(context, { ttl: 60 * 60 }, parent, info)
  //       const rowIds = allRoutes
  //         .filter((availableDynamicRow) =>
  //           availableDynamicRow.conditions.some((condition) =>
  //             matchCondition(condition, {
  //               ...parent,
  //               // ...args,
  //               ...getProduct(context, parent.url?.slice(2)),
  //             }),
  //           ),
  //         )
  //         .map((row) => row.id)
  //       if (rowIds.length === 0) return parent.content
  //       const dynamicRows = await execute(DynamicRowsDocument, {
  //         variables: { rowIds },
  //         ttl: 60 * 60,
  //         headers: ['gcms-stage', 'gcms-locale'],
  //       })
  //       const rows = dynamicRows.dynamicRows.filter((row) => rowIds.includes(row.id))
  //       if (rows.length === 0) return parent.content
  //       return applyDynamicRows(rows, parent.content)
  //     },
  //   },
  // },
}
