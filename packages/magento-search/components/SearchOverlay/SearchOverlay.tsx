import { FormAutoSubmit, InputBaseElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { ProductListItems } from '@graphcommerce/magento-graphcms/components/ProductListItems/ProductListItems'
import {
  ProductFiltersPro,
  ProductFiltersProNoResults,
  productListLink,
  ProductListParams,
  toProductListParams,
  useProductFiltersPro,
} from '@graphcommerce/magento-product'
import {
  breakpointVal,
  filterNonNullableKeys,
  Overlay,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { LayoutHeaderClose } from '@graphcommerce/next-ui/Layout/components/LayoutHeaderClose'
import { t, Trans } from '@lingui/macro'
import {
  alpha,
  Box,
  BoxProps,
  Breadcrumbs,
  InputBaseProps,
  Link,
  List,
  ListItemButton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CategorySearchDocument } from '../../CategorySearch.gql'
import { useProductList } from '../../hooks/useProductList'
import { useSearchResultRemaining } from '../ProductFiltersPro/ProductFiltersProSearchHeader'

function SearchInputShadow(
  props: BoxProps<'div'> & { params: ProductListParams; inputSx?: SxProps<Theme> },
) {
  const { params, sx, inputSx, ...rest } = props
  const { remaining, resultSearch, targetSearch } = useSearchResultRemaining(params)

  return (
    <Box component='div' sx={sx} {...rest}>
      {!resultSearch && !targetSearch ? (
        <Box component='span'>{resultSearch}</Box>
      ) : (
        <>
          <Box
            component='span'
            sx={[
              {
                color: 'transparent',
              },
              ...(Array.isArray(inputSx) ? inputSx : [inputSx]),
            ]}
          >
            {resultSearch}
          </Box>
          <Box
            component='span'
            sx={[
              (theme) => ({
                typography: 'h4',
                color: 'transparent',
                borderBottom: '2px solid',
                borderImage: 'linear-gradient(108deg,#0894FF,#C959DD 34%,#FF2E54 68%,#FF9004)',
                borderImageSlice: 1,
              }),
              ...(Array.isArray(inputSx) ? inputSx : [inputSx]),
            ]}
          >
            {remaining}
          </Box>
        </>
      )}
    </Box>
  )
}

function SearchInput(
  props: Omit<InputBaseProps, 'name' | 'defaultValue'> & {
    params: ProductListParams
    inputSx?: SxProps<Theme>
  },
) {
  const { params, sx, inputSx, ...rest } = props
  const { form, submit } = useProductFiltersPro()
  return (
    <Box sx={{ display: 'grid', '& > *': { gridArea: '1 / 1' } }}>
      <InputBaseElement
        control={form.control}
        name='search'
        color='primary'
        size='medium'
        fullWidth
        placeholder={t`Search...`}
        type='text'
        spellCheck='false'
        autoComplete='off'
        sx={[
          {
            '& .MuiInputBase-input': inputSx,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      />
      <SearchInputShadow params={params} sx={sx} inputSx={inputSx} />

      <FormAutoSubmit control={form.control} name={['search']} submit={submit} leading />
    </Box>
  )
}

export function SearchOverlay() {
  const [open, setOpen] = React.useState(true)

  const [params, setParams] = useState<ProductListParams>({
    filters: {},
    sort: {},
    url: 'search',
    search: '',
    pageSize: 6,
    currentPage: 1,
  })
  const term = params.search

  const { handleSubmit, products } = useProductList({
    skipOnLoad: false,
    params,
    quickSearch: true,
  })

  const categories = useQuery(CategorySearchDocument, {
    variables: { search: params.search, pageSize: 5 },
  })
  const categoryItems = filterNonNullableKeys(
    categories.data?.categories?.items ?? categories.previousData?.categories?.items,
  ).filter((c) => c.include_in_menu)

  const onClose = () => setOpen(false)

  const noResult = products?.total_count === 0 && categoryItems.length === 0

  useEffect(() => {
    // Keyboard handling. Closing is already handled, so that doesn't need to be handled.
    // We want to be able to navigate the search items.
  })

  return (
    <Overlay
      active={open}
      onClosed={onClose} // maxWidth='md'
      variantMd='top'
      variantSm='bottom'
      sizeMd='floating'
      sizeSm='full'
      justifyMd='center'
      sx={(theme) => ({
        '& .LayoutOverlayBase-background': {
          backdropFilter: 'blur(16px)',
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
        },
      })}
      bgColor='default'
    >
      <ProductFiltersPro
        params={params}
        filterTypes={{}}
        autoSubmitMd
        handleSubmit={(formValues) =>
          // eslint-disable-next-line @typescript-eslint/require-await
          handleSubmit(formValues, async () => {
            setParams(toProductListParams(formValues))
          })
        }
      >
        <Box
          sx={(theme) => ({
            position: 'sticky',
            display: 'grid',
            zIndex: 1,
            background: 'transparent',
            boxShadow: theme.shadows[4],
            height: theme.appShell.headerHeightSm,
            [theme.breakpoints.up('md')]: {
              height: theme.appShell.appBarHeightMd,
            },
            gap: theme.page.horizontal,
            pr: theme.page.horizontal,
            alignItems: 'center',
            gridTemplateColumns: '1fr auto auto',
          })}
        >
          <SearchInput
            inputSx={{
              typography: 'h4',
              p: 0,
            }}
            sx={(theme) => ({
              width: '100%',
              height: '100%',
              typography: 'h4',
              pl: theme.page.horizontal,
              ...breakpointVal(
                'borderRadius',
                theme.shape.borderRadius * 3,
                theme.shape.borderRadius * 4,
                theme.breakpoints.values,
              ),
            })}
            params={params}
            size='medium'
          />

          {/* <Box
            sx={(theme) => ({
              typography: 'caption',
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              px: 1,
            })}
          >
          </Box> */}
          {/* <Box> */}
          <LayoutHeaderClose onClose={onClose} />
          {/* </Box> */}
        </Box>

        {products?.suggestions && products.suggestions.length > 0 && (
          <List sx={{ py: 0 }}>
            {products?.suggestions?.map((suggestion) => (
              <ListItemButton
                onClick={() => {
                  console.log('suggestion', suggestion)
                }}
                key={suggestion?.search}
              >
                {suggestion?.search}
              </ListItemButton>
            ))}
          </List>
        )}

        <Box
          sx={(theme) => ({
            px: theme.page.horizontal,
            pb: theme.page.vertical,
            '&:empty': { display: 'none' },
          })}
        >
          {!categories.error && categoryItems.length > 0 && (
            <SectionContainer labelLeft='Categories'>
              {categoryItems.map((category) => (
                <Link
                  underline='none'
                  color='inherit'
                  key={category?.uid}
                  href={productListLink({
                    filters: { category_uid: { eq: category.uid } },
                    sort: {},
                    url: category.url_path,
                  })}
                >
                  <Breadcrumbs>
                    {filterNonNullableKeys(category.breadcrumbs, ['category_name']).map(
                      (breadcrumb) => (
                        <Typography color='text.primary' key={breadcrumb.category_name}>
                          {breadcrumb.category_name}
                        </Typography>
                      ),
                    )}
                    <Typography color='text.primary'>{category.name}</Typography>
                  </Breadcrumbs>
                </Link>
              ))}
            </SectionContainer>
          )}

          {noResult && (
            <SectionContainer labelLeft={<>Products</>}>
              <Trans>We couldn’t find any results for ‘{term}’</Trans>
            </SectionContainer>
          )}

          {params.search && products?.items && products.items.length > 0 && (
            <SectionContainer
              labelLeft={<>Products</>}
              labelRight={
                <Link
                  color='secondary'
                  underline='hover'
                  href={productListLink({ ...params, pageSize: null })}
                >
                  View all ({products.total_count})
                </Link>
              }
            >
              <ProductListItems
                {...products}
                loadingEager={6}
                title={params.search ? `Search ${params.search}` : ''}
                columns={(theme) => ({
                  xs: { count: 2 },
                  md: { count: 3, totalWidth: theme.breakpoints.values.md },
                  lg: { count: 3, totalWidth: theme.breakpoints.values.md },
                })}
              />
            </SectionContainer>
          )}

          {/* {params.search && products?.total_count ? (
          <Button onClick={onClose}>Products search results ({products?.total_count})</Button>
        ) : null} */}
        </Box>
      </ProductFiltersPro>
    </Overlay>
  )
}
