import { Page } from '@graphcommerce/graphql-mesh'
import { verifyWebhookSignature } from '@hygraph/utils'
import algoliasearch from 'algoliasearch'
import { NextApiRequest, NextApiResponse } from 'next'

type AlgoliaResult = {
  objectID: string
  slug: string
  name: string
  content: string
  url: string
  algoliaLastUpdateAtCET: string
}

const algolia = algoliasearch(
  import.meta.graphCommerce.algoliaApplicationId,
  import.meta.graphCommerce.algoliaSearchOnlyApiKey,
)

const indexName = import.meta.graphCommerce.algoliaHygraphIndex
const index = typeof indexName === 'string' ? algolia.initIndex(indexName) : undefined

export function addHygraphRecord(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') res.end()

  const { body } = req
  const gcms = req.headers['gcms-signature']
  const signature = Array.isArray(gcms) ? gcms[0] : gcms
  const secret = import.meta.graphCommerce.hygraphSecret

  if (!index) return res.status(400).send('Missing "algoliaHygraphIndex" config variable')
  if (!secret) return res.status(400).send('Missing "hygraphSecret" config variable')
  if (!signature) return res.status(400).send('Missing gcms-signature header')

  if (!verifyWebhookSignature({ body, signature, secret })) res.status(401).end()

  try {
    const { data } = body

    const { id: objectID, localizations } = data

    const objects = localizations.map((localization: Page & { updatedAt: string }) => {
      const url = `${import.meta.graphCommerce.canonicalBaseUrl}/${localization?.url}`
      const algoliaObject: AlgoliaResult = {
        name: localization?.title ?? '',
        content: localization?.metaDescription,
        url,
        slug: localization?.url,
        algoliaLastUpdateAtCET: localization?.updatedAt,
        objectID,
      }

      return index.saveObject(algoliaObject)
    })

    return res.status(201).send(objects)
  } catch (err) {
    return res.status(400).send(err)
  }
}
