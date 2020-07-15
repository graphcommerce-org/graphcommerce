import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getHeaderProps from 'components/Header/getHeaderProps'
import getProductPageProps, { GetProductPageProps } from 'components/ProductPage/getProductProps'
import useCategoryPageStyles from 'components/CategoryPage/useCategoryPageStyles'
import { Container } from '@material-ui/core'
import clsx from 'clsx'
import { overlay } from 'components/FramerMotion'
import { motion } from 'framer-motion'
import { useHeaderSpacing } from 'components/Header/useHeaderSpacing'

const ProductPage: PageWithShopLayout<GetProductPageProps> = (props) => {
  const {
    products: {
      items: [product],
    },
  } = props
  const classes = useCategoryPageStyles(props)
  const { marginTop } = useHeaderSpacing()

  return (
    <div style={{ height: 400, backgroundColor: 'red' }}>
      <Container className={clsx(classes.container, marginTop)}>
        <motion.img
          src={product.small_image.url}
          alt=''
          style={{ width: 500 }}
          layoutId={`product-${product.sku}`}
        />
      </Container>
    </div>
  )
}

ProductPage.layout = ShopLayout
ProductPage.pageTransition = overlay

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'isadora-skirt' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetProductPageProps,
  { url: string }
> = async (ctx) => {
  if (!ctx.params?.url) throw Error('No params')
  const urlResolve = getUrlResolveProps({ urlKey: `${ctx.params.url}.html` })
  const navigation = getHeaderProps()
  const productPage = getProductPageProps({ urlKey: ctx.params.url })

  return {
    props: {
      ...(await urlResolve),
      ...(await navigation),
      ...(await productPage),
    },
  }
}
