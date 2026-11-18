import type { ApolloClient } from '@apollo/client'
import { beforeEach, expect, it, vi } from 'vitest'

const query = {} as ApolloClient.QueryOptions

let publishRenewSignal: typeof import('./renewSignal').publishRenewSignal
let client: ApolloClient
let created: ApolloClient[]

beforeEach(async () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))

  const entries = new Map<string, unknown>()
  vi.stubGlobal('__incrementalCache', {
    get: async (key: string) => (entries.has(key) ? { value: entries.get(key) } : null),
    set: async (key: string, data: unknown) => {
      entries.set(key, data)
    },
  })

  vi.resetModules()
  ;({ publishRenewSignal } = await import('./renewSignal'))
  const { renewableSsrClient } = await import('./renewableSsrClient')

  created = []
  client = renewableSsrClient(() => {
    const next = { query: vi.fn(async () => ({ data: {} })), cache: {} } as unknown as ApolloClient
    created.push(next)
    return next
  })

  // The first query reads the signal. The next read is possible after the poll interval.
  await client.query(query)
  vi.advanceTimersByTime(5000)
})

it('keeps the client when nothing is published', async () => {
  await client.query(query)

  expect(created).toHaveLength(1)
  expect(created[0].query).toHaveBeenCalledTimes(2)
})

it('sends the first query after a publish to a new client', async () => {
  await publishRenewSignal()
  await client.query(query)

  expect(created).toHaveLength(2)
  expect(created[1].query).toHaveBeenCalledTimes(1)
})

it('sends the queries that start at the same moment to the new client', async () => {
  await publishRenewSignal()
  await Promise.all([client.query(query), client.query(query)])

  expect(created).toHaveLength(2)
  expect(created[0].query).toHaveBeenCalledTimes(1)
  expect(created[1].query).toHaveBeenCalledTimes(2)
})

it('gives the members of the newest client', async () => {
  await publishRenewSignal()
  await client.query(query)

  expect(client.cache).toBe(created[1].cache)
})
