import { Scroller, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { ProductListParams, productListLink } from '@graphcommerce/magento-product'
import { extendableComponent, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box, Link, SxProps, Theme } from '@mui/material'
import { CategoryChildrenFragment } from './CategoryChildren.gql'

type CategoryChildrenProps = Omit<CategoryChildrenFragment, 'uid'> & {
  params: ProductListParams
  sx?: SxProps<Theme>
}

const name = 'CategoryChildren' as const
const parts = ['container', 'scroller', 'link'] as const
const { classes } = extendableComponent(name, parts)

export function CategoryChildren(props: CategoryChildrenProps) {
  const { children, params, sx = [] } = props

  const childItems = filterNonNullableKeys(children, ['url_path', 'name', 'include_in_menu']).map(
    (category) => ({
      name: category.name,
      href: productListLink({
        ...params,
        currentPage: 0,
        url: category.url_path,
        filters: { category_uid: { eq: category.uid } },
      }),
      active: params.url === category.url_path,
    }),
  )

  const hasNavigatableChildren = childItems.some((cat) => !cat.active)
  if (!hasNavigatableChildren) return null

  return (
    <ScrollerProvider scrollSnapAlign='none'>
      <Box
        className={classes.container}
        sx={[{ display: 'flex' }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <Scroller
          className={classes.scroller}
          hideScrollbar
          sx={(theme) => ({
            gridAutoColumns: `max-content`,
            columnGap: theme.spacings.sm,
            marginBottom: '-8px',
          })}
        >
          {childItems.map((category) => (
            <Link
              key={category.href}
              underline='none'
              color='inherit'
              href={category.href}
              className={classes.link}
              sx={(theme) => ({
                whiteSpace: 'nowrap',
                display: 'block',
                typography: 'h6',
                position: 'relative',
                paddingBottom: '8px',
                '&:before': {
                  content: '""',
                  width: 40,
                  height: 2,
                  background: theme.vars.palette.primary.main,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  opacity: category.active ? 1 : 0,
                  transition: 'opacity .2s ease, bottom .2s ease',
                  bottom: category.active ? 5 : 0,
                },
                '&:hover': {
                  '&:before': {
                    opacity: 1,
                    bottom: 5,
                  },
                },
              })}
            >
              {category.name}
            </Link>
          ))}
        </Scroller>
      </Box>
    </ScrollerProvider>
  )
}
