import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  useCompareList,
  EmptyCompareListButton,
  EmptyCompareList,
  CompareForm,
  CompareListSelect,
  CompareListItems,
  CompareListAttributes,
} from '@graphcommerce/magento-compare'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  LayoutOverlay,
  LayoutOverlayProps,
  iconCompare,
  FullPageMessage,
  LayoutOverlayHeader,
  LayoutTitle,
  PageMeta,
} from '@graphcommerce/next-ui'

import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container } from '@mui/material'
import { productListRenderer } from '../components/ProductListItems'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

// todo:
// - Move all form handling to magento-compare package
// - Move Select element logic?
export function ComparePage() {
  const compareList = useCompareList()
  const compareListData = compareList.data
  const compareListCount = compareListData?.compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3

  if (!compareListCount) return <EmptyCompareList />

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Compare products')} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        primary={
          compareList.data?.compareList?.uid && (
            <EmptyCompareListButton compareListUid={compareList.data.compareList.uid} />
          )
        }
        divider={<Box />}
      >
        <LayoutTitle size='small' component='span' icon={iconCompare}>
          <Trans id='Compare' /> ({compareListCount})
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Box>
        <CompareForm>
          <WaitForQueries
            waitFor={compareList}
            fallback={
              <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
                <Trans id='This may take a second' />
              </FullPageMessage>
            }
          >
            <Container maxWidth={gridColumns === 3 ? 'xl' : 'lg'} disableGutters>
              <CompareListSelect />

              <CompareListItems
                renderers={productListRenderer}
                sx={(theme) => ({
                  padding: { xs: theme.spacings.xs, md: theme.spacings.md, lg: theme.spacings.lg },
                  pt: 0,
                })}
              />

              <CompareListAttributes />
            </Container>
          </WaitForQueries>
        </CompareForm>
      </Box>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'compare',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
ComparePage.pageOptions = pageOptions

export default ComparePage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  if (!import.meta.graphCommerce.compare) return { notFound: true }

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
