import { iconSearch, responsiveVal, SvgIcon, extendableComponent } from '@graphcommerce/next-ui'
import { Link, LinkProps } from '@mui/material'
import PageLink from 'next/link'
import { SetRequired } from 'type-fest'

export type SearchLinknProps = SetRequired<LinkProps, 'href'>

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
export function SearchLink(props: SearchLinknProps) {
  const { href, sx = [], children, ...linkProps } = props

  return (
    <PageLink href={href} passHref>
      <Link
        className={classes.root}
        underline='none'
        sx={[
          (theme) => ({
            justifySelf: 'center',
            // @todo make abstract, this is the size of a responsive Fab minus the icon size, divided by 2.
            marginRight: responsiveVal(42 / 4, 56 / 4),
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
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...linkProps}
      >
        <div className={classes.text}>{children ?? <>&nbsp;</>}</div>
        <SvgIcon
          src={iconSearch}
          className={classes.svg}
          sx={{ color: 'text.primary', fontSize: '1.4em' }}
        />
      </Link>
    </PageLink>
  )
}
