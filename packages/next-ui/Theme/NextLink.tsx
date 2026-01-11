'use client'

import { canonicalBaseUrl, storefront } from '@graphcommerce/next-config/config'
import type { LinkProps as NextLinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { forwardRef } from 'react'

export type NextLinkPropsBase = Omit<NextLinkProps, 'legacyBehavior' | 'passHref' | 'as'>
export type AnchorWithoutLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkPropsBase
>
export type LinkProps = AnchorWithoutLinkProps & Partial<NextLinkPropsBase> & { relative?: boolean }

// Get all configured locales for URL parsing
const locales = storefront.map((s) => s.locale)

/**
 * This is a wrapper around the Next.js Link component which can be used with MUI's Link component
 * or any ButtonBase derivative.
 *
 * By default you can use the props provided by the Link or Button component, but you can pass any
 * next/link specific props like `prefetch`, `replace`, `scroll`, `shallow`
 *
 * Compatible with both Pages Router and App Router.
 *
 * - In Pages Router: Uses Next.js locale handling
 * - In App Router with [store] routing: Automatically prefixes URLs with the current store
 *
 * ```typescript
 * const button = (
 *   <Link href='/cart' component={NextLink} prefetch={false}>
 *     Cart
 *   </Link>
 * )
 * ```
 */
// eslint-disable-next-line react/display-name
export const NextLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  let { href, target, relative, locale, ...rest } = props

  const canonical = canonicalBaseUrl
  const pathname = usePathname()

  // Extract current store from pathname (App Router with [store] routing)
  // Pathname will be like /en/women or /en
  const pathSegments = pathname?.split('/').filter(Boolean) ?? []
  const currentStore = locales.includes(pathSegments[0]) ? pathSegments[0] : undefined

  // The href is optional in a MUI link, but required in a Next.js link
  // When the href is not a string, we pass it through directly
  if (!href || typeof href !== 'string') return <Link href={href ?? ''} {...rest} ref={ref} />

  const isFullUrl = href.includes(':') || href.startsWith('//')

  /**
   * When an internal link is provided and it is on the same domain, extract the locale from the URL
   * and make the URL relative without the locale. Prevents Next.js prefixing again with the current
   * locale.
   */
  if (!locale && isFullUrl && canonical && href.startsWith(canonical)) {
    const url = new URL(href)
    locale = locales.find((l) => url.pathname.startsWith(`/${l}/`))
    href = locale ? url.pathname.replace(`/${locale}/`, '/') : url.pathname
    href += url.search
  }

  const isExternal = isFullUrl && canonical && !href.startsWith(canonical)
  if (isExternal) target = target || '_blank'

  // Relative URL's cause more pain than they're worth
  const isHash = href.startsWith('#')
  if (!isExternal && !isHash && !href.startsWith('/') && !relative) href = `/${href}`

  /**
   * App Router with [store] routing: Prefix URLs with the current store if:
   *
   * - We have a current store from the URL
   * - The href doesn't already start with a store prefix
   * - The href is not external or a hash
   */
  if (currentStore && !isExternal && !isHash && href.startsWith('/')) {
    const hrefHasStore = locales.some((l) => href.startsWith(`/${l}/`) || href === `/${l}`)
    if (!hrefHasStore) {
      href = `/${currentStore}${href}`
    }
  }

  return <Link href={href} {...rest} target={target} ref={ref} locale={locale} />
})
