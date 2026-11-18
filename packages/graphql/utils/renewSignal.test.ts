import { beforeEach, expect, it, vi } from 'vitest'

let signal: typeof import('./renewSignal')

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
  signal = await import('./renewSignal')

  // The first read finds no signal. The next read is possible after the poll interval.
  await signal.refreshRenewSignal()
  vi.advanceTimersByTime(5000)
})

it('returns the published value on the first synchronous read after a publish', async () => {
  await signal.publishRenewSignal()

  expect(signal.renewSignal()).toBe(Date.now())
})

it('gives readers that start at the same moment the published value', async () => {
  await signal.publishRenewSignal()

  const values = await Promise.all([signal.refreshRenewSignal(), signal.refreshRenewSignal()])

  expect(values).toEqual([Date.now(), Date.now()])
})
