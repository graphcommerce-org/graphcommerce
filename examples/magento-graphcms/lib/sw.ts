import type { PrecacheEntry } from '@graphcommerce/service-worker'
import { Serwist, productionCaching } from '@graphcommerce/service-worker'

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
}

const serwist = new Serwist({
  // eslint-disable-next-line no-underscore-dangle
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: productionCaching,
  disableDevLogs: true,
})

serwist.addEventListeners()
