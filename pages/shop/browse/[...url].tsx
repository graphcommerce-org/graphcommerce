import React from 'react'
import ShopLayout, { PageWithShopLayout, ShopLayoutProps } from 'shop/venia-ui/ShopLayout'
import getNavigationProps from 'shop/venia-ui/ShopLayout/getNavigationProps'
import { GetStaticProps, GetStaticPaths } from 'next'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'
import getCategoryPageProps, {
  GetCategoryPageProps,
} from 'shop/venia-ui/RootComponents/CategoryPage/getCategoryPageProps'
import CategoryPage from 'shop/venia-ui/RootComponents/CategoryPage'

const PageWithLayout: PageWithShopLayout<GetCategoryPageProps> = (props) => {
  return <CategoryPage {...props} />
}
PageWithLayout.layout = ShopLayout

export default PageWithLayout

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: ['venia-bottoms'] } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetCategoryPageProps,
  { url: [string] }
> = async (ctx) => {
  if (!ctx.params) throw Error('No params')

  // @todo slice everything before queryParam?
  const url = ctx.params.url.slice(0, 1)

  const urlResolve = getUrlResolveProps({ urlKey: `${url.join('/')}.html` })
  const navigationProps = getNavigationProps()
  const categoryPageProps = getCategoryPageProps({
    urlParams: ctx.params.url.slice(1),
    urlResolve,
    url,
  })

  return {
    props: {
      ...(await urlResolve),
      ...(await navigationProps),
      ...(await categoryPageProps),
    },
  }
}
