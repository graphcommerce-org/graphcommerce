import { verifyWebhookSignature } from '@hygraph/utils'
import algoliasearch from 'algoliasearch'
import { NextApiRequest, NextApiResponse } from 'next'

const algolia = algoliasearch(
  import.meta.graphCommerce.algoliaApplicationId,
  import.meta.graphCommerce.algoliaSearchOnlyApiKey,
)

const indexName = import.meta.graphCommerce.algoliaHygraphIndex
const index = indexName ? algolia.initIndex(indexName) : undefined

export async function removeHygraphRecord(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.end()

  const { body } = req
  const gcms = req.headers['gcms-signature']
  const signature = Array.isArray(gcms) ? gcms[0] : gcms
  const secret = import.meta.graphCommerce.hygraphSecret

  if (!index) return res.status(400).send('Missing "algoliaHygraphIndex" config variable')
  if (!secret) return res.status(400).send('Missing "hygraphSecret" config variable')
  if (!signature) return res.status(400).send('Missing gcms-signature header')

  if (!verifyWebhookSignature({ body, signature, secret })) res.status(401).end()

  try {
    const { id: objectID, ...rest } = body

    await index.deleteObject(objectID as string)

    return res.status(201).send(rest)
  } catch (err) {
    return res.status(400).send(err)
  }
}
