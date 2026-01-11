export * from './Footer'
export * from './LayoutDefaultRsc'
export * from './LayoutNavigation'
export * from './LayoutNavigationWrapper'
export * from './LayoutProviderRsc'
export * from './Logo'
// Note: magentoMenuToNavigation is intentionally NOT exported here
// It's only used internally by LayoutNavigation (a 'use client' component)
// Exporting it from this barrel would cause RSC errors due to @graphcommerce/next-ui imports
