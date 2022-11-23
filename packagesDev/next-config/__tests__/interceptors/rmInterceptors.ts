import fs from 'node:fs'
import { rmInterceptors } from '../../src/interceptors/rmInterceptors'
import { resolveDependenciesSync } from '../../src/utils/resolveDependenciesSync'

const projectRoot = `${process.cwd()}/examples/magento-graphcms`

it('removes all interceptors from disk', () => {
  const dependencies = resolveDependenciesSync(projectRoot)

  const dir = `${dependencies.get('@graphcommerce/next-config')}/__mocks__`
  const file = `${dir}/bla.interceptor.tsx`
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(file, 'export const hoi = 1')

  expect(rmInterceptors(projectRoot).join('|')).toMatchInlineSnapshot(`""`)
})
