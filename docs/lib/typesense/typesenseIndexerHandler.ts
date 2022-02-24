import type { NextApiRequest, NextApiResponse } from 'next'
import { TypesenseError } from 'typesense/lib/Typesense/Errors'
import { IndexerHandler } from './IndexerHandler'
import { BaseDocument, SearchIndexer } from './SearchIndexer'
import { typesenseClientConf } from './typesenseClientConf'

export function typesenseIndexerHandler(indexers: SearchIndexer<BaseDocument>[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const handler = new IndexerHandler(typesenseClientConf(), indexers)
    try {
      const count = await handler.all()
      res.status(200).json({ status: 'success', count })
    } catch (e) {
      if (e instanceof TypesenseError) {
        res.json(e)
      }
      console.log(e)
      res.status(500)
    }

    res.end()
  }
}
