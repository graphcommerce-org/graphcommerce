import {
  iconSearch,
  responsiveVal,
  IconSvg,
  extendableComponent,
  useFabSize,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Breakpoint, Fab, FabProps, Link, LinkProps } from '@mui/material'
import { useRouter } from 'next/router'
import type { SetRequired } from 'type-fest'

export type SearchLinkProps = {
  breakpoint?: Breakpoint
  fab: FabProps
} & SetRequired<Pick<LinkProps, 'href' | 'sx' | 'children'>, 'href'>

const name = 'SearchLink' as const
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
  const { href, sx = [], children, breakpoint = 0, fab, ...linkProps } = props
  const router = useRouter()
  const fabSize = useFabSize('responsive')
  const fabSx = fab.sx ?? []

  return (
    <>
      <Link
        component='button'
        className={classes.root}
        underline='none'
        onClick={(e) => {
          e.preventDefault()
          return router.push(href)
        }}
        sx={[
          (theme) => ({
            justifySelf: 'center',
            // @todo make abstract, this is the size of a responsive Fab minus the icon size, divided by 2.
            marginRight: `calc(${fabSize} / 4)`,
            width: responsiveVal(64, 172),
            borderRadius: 2,
            typography: 'body2',
            display: 'flex',
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
            [theme.breakpoints.down(breakpoint)]: {
              display: 'none',
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
      <Fab
        href='/search'
        size='large'
        color='inherit'
        sx={[
          (theme) => ({
            display: 'none',
            [theme.breakpoints.down(breakpoint)]: {
              display: 'inline-flex',
            },
          }),
          ...(Array.isArray(fabSx) ? fabSx : [fabSx]),
        ]}
      >
        <IconSvg
          aria-label={i18n._(/* i18n */ 'Search...')}
          src={iconSearch}
          size='large'
          sx={{ color: 'text.primary' }}
        />
      </Fab>
    </>
  )
}
