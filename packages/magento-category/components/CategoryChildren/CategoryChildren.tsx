import { Scroller, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { ProductListLink, ProductListParams } from '@graphcommerce/magento-product'
import { extendableComponent } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
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

  if (!children || children.length === 0) return null

  return (
    <ScrollerProvider scrollSnapAlign='none'>
      <Box
        className={classes.container}
        sx={[
          (theme) => ({
            display: 'flex',
            justifyContent: 'center',
            marginBottom: theme.spacings.sm,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Scroller
          className={classes.scroller}
          hideScrollbar
          sx={{ gridAutoColumns: `max-content` }}
        >
          {children.map((cat) => {
            if (!cat?.url_path || !cat.name || !cat.include_in_menu) return null

            return (
              <ProductListLink
                key={cat.url_path}
                underline='none'
                color='inherit'
                url={cat.url_path}
                filters={{ category_uid: { eq: cat.uid } }}
                sort={params.sort}
                className={classes.link}
                sx={(theme) => ({
                  whiteSpace: 'nowrap',
                  display: 'block',
                  marginRight: `${theme.spacings.xxs}`,
                  marginLeft: `${theme.spacings.xxs}`,
                  typography: 'h6',
                  position: 'relative',
                  paddingBottom: '8px',
                  '&:before': {
                    content: '""',
                    width: 40,
                    height: 2,
                    background: theme.palette.primary.main,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    margin: '0 auto',
                    opacity: 0,
                    transition: 'opacity .2s ease, bottom .2s ease',
                    bottom: 0,
                  },
                  '&:hover': {
                    '&:before': {
                      opacity: 1,
                      bottom: 5,
                    },
                  },
                })}
              >
                {cat.name}
              </ProductListLink>
            )
          })}
        </Scroller>
      </Box>
    </ScrollerProvider>
  )
}
