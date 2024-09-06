import { getIndexName } from '@graphcommerce/algolia-mesh/mesh/getIndexName'
import {
  MeshContext,
  AlgoliagetRecommendationsParams_Input,
  // AlgoliarelatedModel,
} from '@graphcommerce/graphql-mesh'

// function returnAlgoliaModelString(model: string): AlgoliarelatedModel {
//   const returnObject = {
//     related: 'related_products',
//   }
//   return model
// }

function getRequest(model, objectId, indexName) {
  const returnObject = {
    related: {
      Related_products_Input: {
        indexName,
        objectID: objectId,
        threshold: 100,
        model: 'related_products',
      },
    },
  }

  return returnObject[model] ? returnObject[model] : {}
}
export function getRecommendationsInput(
  // args: QueryproductsArgs,
  context: MeshContext,
  objectId: string,
  model: string,
): AlgoliagetRecommendationsParams_Input {
  const indexName = getIndexName(context)
  return {
    requests: [getRequest(model, objectId, indexName)],
  }
}
