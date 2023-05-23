import Link, { LinkProps as NextLinkProps } from 'next/link'
import { useParams } from 'next/navigation'
import React, { forwardRef } from 'react'
import { pageLoading } from '../PageLoadIndicator/PageLoadIndicator2'

type LinkProps = Omit<NextLinkProps, 'legacyBehavior' | 'passHref' | 'as'>
type AnchorWithoutLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>
type LinkProppies = AnchorWithoutLinkProps & Partial<LinkProps> & { relative?: boolean }

// https://github.com/vercel/next.js/blob/400ccf7b1c802c94127d8d8e0d5e9bdf9aab270c/packages/next/src/client/link.tsx#L169
function isModifiedEvent(event: React.MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement
  const target = eventTarget.getAttribute('target')
  return (
    (target && target !== '_self') ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  )
}

/**
 * This is a wrapper around the Next.js Link component which can be used with MUI's Link component
 * or any ButtonBase derivative.
 *
 * By default you can use the the props provided by the Link or Button component, but you to pass
 * any next/link specific props like `prefetch`, `replace`, `scroll`, `shallow`
 *
 * ```tsc
 * const button = (
 *   <Link href='/cart' component={NextLink} prefetch={false}>
 *     Cart
 *   </Link>
 * )
 * ```
 */
export const NextLink = forwardRef<HTMLAnchorElement, LinkProppies>((props, ref) => {
  const storefront: string | undefined = useParams()?.storefront

  let { href, target, relative, onClick, ...rest } = props

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

  return (
    <Link
      href={hrefString}
      {...rest}
      target={target}
      ref={ref}
      onClick={(e) => {
        onClick?.(e)
        if (!isModifiedEvent(e)) {
          const { pathname, search, hash } = window.location
          console.log(href, `${pathname}${search}${hash}`)
          if (href !== `${pathname}${search}${hash}`) pageLoading.set(true)
        }
      }}
    />
  )
})
