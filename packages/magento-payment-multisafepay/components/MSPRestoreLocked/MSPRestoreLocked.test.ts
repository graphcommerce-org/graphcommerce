import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const file = fileURLToPath(new URL('./MSPRestoreLocked.tsx', import.meta.url))

it('imports only paths that the GraphCommerce packages export', () => {
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

// MSPRestoreLocked is on every page, and the googlerecaptcha plugin on ApolloErrorSnackbar loads reCAPTCHA.
it('renders ApolloErrorSnackbar only for an error', () => {
  const guards = [...readFileSync(file, 'utf8').matchAll(/(\S+)\s*<ApolloErrorSnackbar\b/g)].map(
    ([, guard]) => guard,
  )

  expect(guards).toEqual(['&&'])
})
