import { packageRoots } from '../../src/utils/packageRoots'

describe('packageRoots', () => {
  it('should simplify all common paths', () => {
    const paths = [
      '../../packages/cli',
      '../../packages/hygraph-cli',
      '../../packagesDev/next-config',
      '../../packagesDev/next-la',
      '../../../layers/paketo-buildpacks_yarn-install/build-modules/node_modules/@graphcommerce/magento-cart-items',
      '../../../layers/paketo-buildpacks_yarn-install/build-modules/node_modules/@graphcommerce/magento-product',
      // ... (rest of your paths)
    ]

    const expectedRoots = [
      '../../packages',
      '../../packagesDev',
      '../../../layers/paketo-buildpacks_yarn-install/build-modules/node_modules/@graphcommerce',
    ]

    const roots = packageRoots(paths)

    // Expect roots to be an array
    expect(Array.isArray(roots)).toBe(true)

    // Expect the roots array to be equal to expectedRoots
    expect(expectedRoots).toEqual(roots)
  })

  it('should return an empty array for no common roots', () => {
    const paths = ['../a/b', '../c/d']
    const roots = packageRoots(paths)
    expect(roots).toEqual([])
  })
})
