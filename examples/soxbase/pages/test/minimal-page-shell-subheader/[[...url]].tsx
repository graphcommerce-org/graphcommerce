import { mergeDeep } from '@apollo/client/utilities'
import { Box, Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import PageContentHeader from '@reachdigital/next-ui/AppShell/PageContentHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React, { useEffect, useRef, useState } from 'react'
import { ProductListParamsProvider } from '../../../../../packages/magento-category'
import {
  ProductListFilters,
  ProductListFiltersContainer,
  ProductListSort,
} from '../../../../../packages/magento-product'
import { ProductListDocument } from '../../../../../packages/magento-product/ProductList/ProductList.gql'
import {
  FilterTypes,
  ProductListParams,
} from '../../../../../packages/magento-product/ProductListItems/filterTypes'
import {
  extractUrlQuery,
  parseParams,
} from '../../../../../packages/magento-product/ProductListItems/filteredProductList'
import { getFilterTypes } from '../../../../../packages/magento-product/ProductListItems/getFilterTypes'
import { SearchDocument, SearchQuery, SearchForm } from '../../../../../packages/magento-search'

import ContentHeaderPrimaryAction from '../../../../../packages/next-ui/AppShell/ContentHeaderPrimaryAction'
import Logo from '../../../components/AppShell/Logo'
import MinimalPageShell, {
  MinimalPageShellProps,
} from '../../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument, DefaultPageQuery } from '../../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = DefaultPageQuery &
  SearchQuery & { filterTypes: FilterTypes; params: ProductListParams }
type RouteProps = { url: string[] }
type GetPageStaticProps = GetStaticProps<MinimalPageShellProps, Props, RouteProps>

// TODO: throw away. for testing only
const useStyles = makeStyles((theme: Theme) => ({
  longContent: {
    height: 800,
  },
}))

function MinimalAppShellSubheader(props: Props) {
  const { params, products, filters, filterTypes } = props
  const classes = useStyles()

  // TODO: something like useContentHeaderTitleOffset() hook or something more abstract like 'useElementOffset()' hook?
  const titleRefInternal = useRef<HTMLDivElement>()
  const [titleRef, setTitleRef] = useState<React.MutableRefObject<HTMLDivElement | undefined>>()
  const titleRefCallback: React.RefCallback<HTMLDivElement> = (node) => {
    titleRefInternal.current = node ?? undefined
    setTitleRef(titleRefInternal)
  }
  const [animateStart, setAnimateStart] = useState<number | undefined>(undefined)

  useEffect(() => {
    setAnimateStart(
      ((titleRef?.current?.offsetTop ?? 0) + (titleRef?.current?.clientHeight ?? 0)) * 0.5,
    )
  }, [titleRef])

  return (
    <ProductListParamsProvider value={params}>
      <PageContentHeader
        primary={<ContentHeaderPrimaryAction href='/test/minimal-page-shell' text='Next' />}
        logo={<Logo />}
        title={
          <Typography variant='h4' component='span'>
            Minimal UI
          </Typography>
        }
        animateStart={animateStart}
        // divider={<ContentHeaderStepper steps={3} currentStep={1} />}
        subHeader={<SearchForm urlHandle='test/minimal-page-shell-subheader' />}
        scrolled
        billBoard={
          <Container maxWidth={false}>
            <ProductListFiltersContainer>
              <ProductListSort sort_fields={products?.sort_fields} />
              <ProductListFilters aggregations={filters?.aggregations} filterTypes={filterTypes} />
            </ProductListFiltersContainer>
          </Container>
        }
      />
      <Container maxWidth='md' className={classes.longContent}>
        <div ref={titleRefCallback}>
          <Box textAlign='center' mb={3}>
            <Typography variant='h2' component='h2'>
              Minimal UI
            </Typography>
          </Box>
        </div>
        Content here
      </Container>
    </ProductListParamsProvider>
  )
}

MinimalAppShellSubheader.pageOptions = {
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default MinimalAppShellSubheader

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  return {
    paths: [{ params: { url: [] } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const [search = '', query = []] = extractUrlQuery(params)

  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const rootCategory = (await conf).data.storeConfig?.root_category_uid ?? ''
  const staticClient = apolloClient(locale)
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: 'minimal-page-shell-subheader', rootCategory },
  })

  const productListParams = parseParams(
    `minimal-page-shell-subheader${search.length > 2 ? `/${search}` : search}`,
    query,
    await filterTypes,
  )

  if (!productListParams) return { notFound: true }

  const products =
    search && search.length > 2
      ? client.query({
          query: SearchDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
            search,
          }),
        })
      : client.query({
          query: ProductListDocument,
          variables: mergeDeep(productListParams, {
            categoryUid: rootCategory,
          }),
        })

  return {
    props: {
      ...(await page).data,
      ...(await products).data,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 1,
  }
}
