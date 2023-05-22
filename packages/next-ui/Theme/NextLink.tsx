import Link, { LinkProps as NextLinkProps } from 'next/link'
import { useParams } from 'next/navigation'
import React, { forwardRef } from 'react'

type LinkProps = Omit<NextLinkProps, 'legacyBehavior' | 'passHref' | 'as'>
type AnchorWithoutLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>
type LinkProppies = AnchorWithoutLinkProps & Partial<LinkProps> & { relative?: boolean }

/**
 * This is a wrapper around the Next.js Link component which can be used with MUI's Link component
 * or any ButtonBase derivative.
 *
 * By default you can use the the props provided by the Link or Button component, but you to pass
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
export const NextLink = forwardRef<HTMLAnchorElement, LinkProppies>((props, ref) => {
  const storefront: string | undefined = useParams()?.storefront

  let { href, target, relative, ...rest } = props

  // The href is optional in a MUI link, but required in a Next.js link
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  if (!href) return <a {...rest} ref={ref} />

  let hrefString = href.toString()
  const isExternal = hrefString.includes(':') || hrefString.startsWith('//')
  const isHash = hrefString.startsWith('#')

  if (isExternal) target = target || '_blank'
  target = typeof target === 'undefined' && isExternal ? '_blank' : target

  // Relative URL's cause more pain than they're worth
  if (!isExternal && !isHash && !hrefString.startsWith('/') && !relative) href = `/${href}`

  if (!isExternal && !isHash && storefront) hrefString = `/${storefront}${hrefString}`

  return <Link href={hrefString} {...rest} target={target} ref={ref} />
})
