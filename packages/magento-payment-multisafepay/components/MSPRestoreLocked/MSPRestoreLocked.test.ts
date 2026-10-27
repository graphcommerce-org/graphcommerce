import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

it('imports only paths that the GraphCommerce packages export', () => {
  const file = fileURLToPath(new URL('./MSPRestoreLocked.tsx', import.meta.url))
  const require = createRequire(file)
  const specifiers = [
    ...readFileSync(file, 'utf8').matchAll(/from '(@graphcommerce\/[^']+)'/g),
  ].map(([, specifier]) => specifier)

  const notExported = specifiers.filter((specifier) => {
    try {
      require.resolve(specifier)
      return false
    } catch {
      return true
    }
  })

  expect(notExported).toEqual([])
})
