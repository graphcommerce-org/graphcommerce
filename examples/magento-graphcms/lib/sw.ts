import { runtimeCaching, PrecacheEntry, installSerwist } from '@graphcommerce/service-worker'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
}

installSerwist({
  // eslint-disable-next-line no-underscore-dangle
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
  cleanupOutdatedCaches: true,
})
