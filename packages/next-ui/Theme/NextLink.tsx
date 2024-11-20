import type { LinkProps as NextLinkProps } from 'next/link'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { forwardRef } from 'react'
import { useStorefrontConfig } from '../hooks/useStorefrontConfig'

type NextLinkPropsBase = Omit<NextLinkProps, 'legacyBehavior' | 'passHref' | 'as'>
type AnchorWithoutLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkPropsBase
>
type LinkProps = AnchorWithoutLinkProps & Partial<NextLinkPropsBase> & { relative?: boolean }

/**
 * This is a wrapper around the Next.js Link component which can be used with MUI's Link component
 * or any ButtonBase derivative.
 *
 * By default you can use the props provided by the Link or Button component, but you can pass
 * any next/link specific props like `prefetch`, `replace`, `scroll`, `shallow`
 *
 * ```typescript
 * const button = (
 *   <Link href='/cart' component={NextLink} prefetch={false}>
 *     Cart
 *   </Link>
 * )
 * ```
 */
export const NextLink = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  let { href, target, relative, locale, ...rest } = props

  const router = useRouter()
  const canonicalBaseUrl =
    useStorefrontConfig().canonicalBaseUrl ?? import.meta.graphCommerce.canonicalBaseUrl

  // The href is optional in a MUI link, but required in a Next.js link
  // When the href is not a string, we pass it through directly
  if (!href || typeof href !== 'string') return <Link href={href ?? ''} {...rest} ref={ref} />

  const isFullUrl = href.includes(':') || href.startsWith('//')

  /**
   * When an internal link is provided and it is on the same domain, extract the locale
   * from the URL and make the URL relative without the locale. Prevents Next.js prefixing
   * again with the current locale.
   */
  if (!locale && isFullUrl && href.startsWith(canonicalBaseUrl)) {
    const url = new URL(href)
    locale = router.locales?.find((l) => url.pathname.startsWith(`/${l}/`))
    href = locale ? url.pathname.replace(`/${locale}/`, '/') : url.pathname
  }

  const isExternal = isFullUrl && !href.startsWith(canonicalBaseUrl)
  if (isExternal) target = target || '_blank'

  // Relative URL's cause more pain than they're worth
  const isHash = href.startsWith('#')
  if (!isExternal && !isHash && !href.startsWith('/') && !relative) href = `/${href}`

  return <Link href={href} {...rest} target={target} ref={ref} locale={locale} />
})
