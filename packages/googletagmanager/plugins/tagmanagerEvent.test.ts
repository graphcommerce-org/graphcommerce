// @vitest-environment happy-dom

import { afterEach, expect, it, vi } from 'vitest'

const datalayer = vi.hoisted(() => ({ googleEventNames: undefined as string[] | undefined }))

// google-datalayer loads this plugin through the sendEvent interceptor before it defines googleEventNames.
vi.mock('@graphcommerce/google-datalayer', () => ({
  get googleEventNames() {
    return datalayer.googleEventNames
  },
}))

afterEach(() => {
  window.dataLayer = undefined
})

it('reads the event names of google-datalayer when it sends an event', async () => {
  const { sendEvent } = await import('./tagmanagerEvent')
  datalayer.googleEventNames = ['view_item']
  window.dataLayer = []

  sendEvent(() => {}, 'view_item', { items: [] })

  expect(window.dataLayer).toEqual([
    { ecommerce: null },
    { event: 'view_item', ecommerce: { items: [] } },
  ])
})
