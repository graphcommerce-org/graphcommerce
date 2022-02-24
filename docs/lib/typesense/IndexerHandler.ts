import { Client } from 'typesense/lib/Typesense'
import { ConfigurationOptions } from 'typesense/lib/Typesense/Configuration'
import { ObjectNotFound } from 'typesense/lib/Typesense/Errors'
import { BaseDocument, SearchIndexer } from './SearchIndexer'
import { batchIterable } from './batchInterable'

export class IndexerHandler {
  client: Client

  constructor(
    clientOptions: ConfigurationOptions,
    public indexers: SearchIndexer<BaseDocument>[],
    private batchSize: number = 1000,
  ) {
    this.client = new Client(clientOptions)
  }

  async all() {
    let count = 0
    for await (const indexer of this.indexers) {
      const resCount = await this.#reindex(indexer)
      count += resCount
    }
    return count
  }

  /** @throws {TypesenseError} */
  async #reindex(indexer: SearchIndexer<BaseDocument>) {
    const { name } = indexer.schema

    try {
      await this.client.collections(name).retrieve()
      await this.client.collections(name).delete()
    } catch (e) {
      if (!(e instanceof ObjectNotFound)) throw e
    }
    await this.client.collections().create(indexer.schema)

    let count = 0
    for await (const documents of batchIterable(indexer.all(), this.batchSize)) {
      const result = await this.client.collections(name).documents().import(documents)
      count += result.length
    }

    return count
  }
}
