import { iconSearch, IconSvg, extendableComponent, useFabSize } from '@graphcommerce/next-ui'
import { Link, LinkProps } from '@mui/material'
import { useRouter } from 'next/router'
import type { SetRequired } from 'type-fest'

export type SearchLinkProps = SetRequired<Pick<LinkProps, 'href' | 'sx' | 'children'>, 'href'>

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
  const { href, sx = [], children, ...linkProps } = props
  const router = useRouter()

  const fabSize = useFabSize('responsive')

  return (
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
          width: theme.responsiveTemplate`${[64, 172]}px`,
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
  )
}
