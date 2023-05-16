import { Asset } from '@graphcommerce/graphcms-ui'
import { getHygraphPage } from '@graphcommerce/graphcms-ui/server'
import {
  CategoryChildren,
  CategoryDescription,
  CategoryHeroNav,
  CategoryHeroNavTitle,
} from '@graphcommerce/magento-category'
import { getCategoryPage } from '@graphcommerce/magento-category/server'
import { getProductListItems } from '@graphcommerce/magento-product/server'
import { LayoutHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { setConfigContext } from '@graphcommerce/next-ui/server'
import { Container } from '@mui/material'
import { Metadata } from 'next'
import { RowRenderer } from '../../../../components/GraphCMS'
import { RowProduct } from '../../../../components/GraphCMS/RowProduct/RowProduct'
import { CategoryPageDocument } from '../../../../graphql/CategoryPage.gql'
import { LayoutProps, PageProps } from '../../types'

export const generateMetadata = async (props: PageProps) => {
  setConfigContext(props)
  const categoryPage = getCategoryPage(CategoryPageDocument, props)

  const category = await categoryPage.category

  return {
    title: category?.meta_title ?? category?.name,
    description: category?.meta_description,
  } satisfies Metadata
}

export default async (props: LayoutProps) => {
  const { params, children } = props
  setConfigContext(props)

  const categoryPage = getCategoryPage(CategoryPageDocument, props)

  const page = await getHygraphPage(categoryPage.params, categoryPage.category).page
  const category = await categoryPage.category

  const isLanding = category?.display_mode === 'PAGE'
  const isCategory = params && category && (await categoryPage.filterTypes)

  if (!category && !page) return null

  return (
    <>
      <LayoutHeader floatingMd floatingSm />

      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {category?.name ?? page?.title}
        </LayoutTitle>
      </LayoutHeader>
      {!isLanding && (
        <Container maxWidth={false}>
          <LayoutTitle
            variant='h1'
            gutterTop
            sx={{ marginBottom: category?.description && `var(--spacings-md)` }}
            gutterBottom={
              !isCategory || (!category?.description && category?.children?.length === 0)
            }
          >
            {category?.name ?? page?.title}
          </LayoutTitle>
        </Container>
      )}

      {isCategory && isLanding && (
        <CategoryHeroNav
          {...category}
          asset={page?.asset && <Asset asset={page.asset} loading='eager' />}
          title={<CategoryHeroNavTitle>{category?.name}</CategoryHeroNavTitle>}
        />
      )}

      {isCategory && !isLanding && (
        <>
          <CategoryDescription description={category.description} />
          <CategoryChildren params={await categoryPage.params}>
            {category.children}
          </CategoryChildren>
          {children}
        </>
      )}

      {page && (
        <RowRenderer
          {...page}
          renderer={{
            RowProduct: async (rowProps) => {
              const listItems = getProductListItems(categoryPage.params)
              return (
                <RowProduct
                  {...rowProps}
                  {...(await listItems).data.products?.items?.[0]}
                  items={(await listItems).data.products?.items?.slice(0, 8)}
                />
              )
            },
          }}
        />
      )}
    </>
  )
}
