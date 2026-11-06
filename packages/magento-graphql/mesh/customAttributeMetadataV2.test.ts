import type { MeshContext } from '@graphcommerce/graphql-mesh'
import { expect, it } from 'vitest'
import { customAttributeMetadataV2 } from './customAttributeMetadataV2'

function createContext(store: string, cache: Map<string, unknown>) {
  return {
    headers: { store },
    cache: {
      get: async (key: string) => cache.get(key),
      set: async (key: string, value: unknown) => {
        cache.set(key, value)
      },
    },
    m2: {
      Query: {
        customAttributeMetadataV2: async () => ({ code: 'color', label: `Color ${store}` }),
      },
    },
  } as unknown as MeshContext
}

it('caches the attribute metadata per store', async () => {
  const cache = new Map<string, unknown>()
  const input = { entity_type: 'catalog_product', attribute_code: 'color' } as const

  const english = await customAttributeMetadataV2(input, createContext('en_US', cache))
  const dutch = await customAttributeMetadataV2(input, createContext('nl_NL', cache))

  expect(english?.label).toBe('Color en_US')
  expect(dutch?.label).toBe('Color nl_NL')
})
