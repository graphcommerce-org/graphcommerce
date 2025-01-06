import {
  extendableComponent,
  iconSearch,
  IconSvg,
  responsiveVal,
  useFabSize,
  useIconSvgSize,
} from '@graphcommerce/next-ui'
import type { Breakpoint, FabProps, LinkProps } from '@mui/material'
import { Fab, Link } from '@mui/material'
import { useRouter } from 'next/router'
import type { KeyboardEventHandler, MouseEventHandler } from 'react'
import type { SetRequired } from 'type-fest'

export type SearchLinkProps = {
  breakpoint?: Breakpoint
  fab?: FabProps
} & SetRequired<Pick<LinkProps<'a'>, 'href' | 'sx' | 'children' | 'onClick'>, 'href'>

const name = 'SearchLink'
const parts = ['root', 'text', 'svg'] as const
const { classes } = extendableComponent(name, parts)

/**
 * Usage:
 *
 * ```tsx
 * const MyComponent = () => <SearchLink href='/search' />
 * ```
 */
export function SearchLink(props: SearchLinkProps) {
  const { href, sx = [], children, breakpoint, fab, onClick, ...linkProps } = props
  const router = useRouter()
  const fabSize = useFabSize('responsive')
  const iconSize = useIconSvgSize('large')
  const { sx: fabSx = [], size, color, ...fabProps } = fab ?? {}

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    onClick?.(e)
    return router.push(href)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLAnchorElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      return router.push(href)
    }
    return undefined
  }

  return (
    <>
      <Link
        href={href}
        rel='noindex'
        className={classes.root}
        underline='none'
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        sx={[
          (theme) => ({
            justifySelf: 'center',
            marginRight: `calc((${fabSize} - ${iconSize}) / 2)`,
            width: responsiveVal(64, 172),
            borderRadius: 2,
            typography: 'body2',
            display: breakpoint ? { xs: 'none', [breakpoint]: 'flex' } : 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.spacings.xs,
            color: 'text.secondary',
            border: 1,
            borderColor: 'divider',
            py: 1,
            px: 1.5,
            '&:hover': {
              borderColor: 'text.secondary',
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...linkProps}
      >
        <div className={classes.text}>{children ?? <>&nbsp;</>}</div>
        <IconSvg
          src={iconSearch}
          className={classes.svg}
          sx={{ color: 'text.primary', fontSize: '1.4em' }}
        />
      </Link>
      {breakpoint && (
        <Fab
          href={href}
          rel='noindex'
          size={size ?? 'large'}
          color={color ?? 'inherit'}
          sx={[
            { display: { xs: 'inline-flex', [breakpoint]: 'none' } },
            ...(Array.isArray(fabSx) ? fabSx : [fabSx]),
          ]}
          {...fabProps}
        >
          <IconSvg src={iconSearch} size='large' sx={{ color: 'text.primary' }} />
        </Fab>
      )}
    </>
  )
}
