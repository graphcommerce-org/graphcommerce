import { createRequire } from 'node:module'
import type { GraphCommerceConfig } from '@graphcommerce/next-config'
import { meshConfig } from './meshRecaptcha'

const resolver = '@graphcommerce/googlerecaptcha/mesh/resolvers.ts'

function additionalResolvers(magentoVersion: number) {
  const graphCommerceConfig = { magentoVersion, googleRecaptchaKey: 'key' } as GraphCommerceConfig
  return meshConfig(
    (config) => config,
    { sources: [], additionalResolvers: [] },
    graphCommerceConfig,
  ).additionalResolvers
}

it('resolves recaptchaV3Config from the configuration for Magento 2.4.6 and earlier', () => {
  expect(additionalResolvers(246)).toContain(resolver)
})

it('resolves recaptchaV3Config from Magento 2.4.7 and later', () => {
  expect(additionalResolvers(247)).not.toContain(resolver)
  expect(additionalResolvers(248)).not.toContain(resolver)
})

it('exports the resolver that the mesh imports', () => {
  expect(() => createRequire(import.meta.url).resolve(resolver)).not.toThrow()
})
