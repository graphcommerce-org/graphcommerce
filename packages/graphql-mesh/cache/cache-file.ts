/* eslint-disable import/no-extraneous-dependencies */
import { fs, path as pathModule } from '@graphql-mesh/cross-helpers'
import type { ImportFn, KeyValueCache, KeyValueCacheSetOptions } from '@graphql-mesh/types'
import { pathExists, writeJSON } from '@graphql-mesh/utils'
import DataLoader from 'dataloader'

export default class FileCache<V extends { ttl: number } = { ttl: number }>
  implements KeyValueCache<V>
{
  json$: Promise<Record<string, V>>

  absolutePath: string

  writeDataLoader: DataLoader<string, string>

  constructor({ path, importFn }: { path: string; importFn: ImportFn }) {
    this.absolutePath = pathModule.isAbsolute(path) ? path : pathModule.join(process.cwd(), path)
    this.json$ = pathExists(this.absolutePath).then(async (isExists) => {
      if (isExists) {
        const existingData = JSON.parse(
          (await fs.promises.readFile(this.absolutePath, 'utf-8')) ?? '{}',
        )
        return {
          ...existingData,
        }
      }
      return {}
    })
    this.writeDataLoader = new DataLoader(
      async (keys) => {
        const json = await this.json$
        await writeJSON(this.absolutePath, json)
        return keys
      },
      { cache: false },
    )
  }

  async getKeysByPrefix(prefix: string) {
    const json = await this.json$
    return Object.keys(json).filter((key) => key.startsWith(prefix))
  }

  async get(name: string) {
    const json = await this.json$
    return json[name]
  }

  async set(name: string, value: V, { ttl = Infinity }: KeyValueCacheSetOptions = {}) {
    const json = await this.json$
    json[name] = { ...value, ttl }
    await this.writeDataLoader.load(name)
  }

  async delete(name: string) {
    const json = await this.json$
    delete json[name]
    try {
      await this.writeDataLoader.load(name)
      return true
    } catch {
      return false
    }
  }
}
