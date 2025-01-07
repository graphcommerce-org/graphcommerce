import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CompareListAttributes,
  CompareListForm,
  CompareListIntroText,
  CompareListItems,
  CompareListSelect,
  EmptyCompareList,
  EmptyCompareListButton,
  useCompareList,
} from '@graphcommerce/magento-compare'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps, LayoutOverlayProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconCompare,
  LayoutOverlay,
  LayoutOverlayHeader,
  LayoutTitle,
  PageMeta,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { productListRenderer } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

export function ComparePage() {
  const compareList = useCompareList()
  const compareListCount = compareList.data?.compareList?.item_count ?? 0

  return (
    <CompareListForm key={compareList.data?.compareList?.uid}>
      <PageMeta title={i18n._(/* i18n */ 'Compare products')} metaRobots={['noindex']} />

      <LayoutOverlayHeader
        switchPoint={-1000}
        primary={<EmptyCompareListButton />}
        divider={<Box />}
      >
        <LayoutTitle size='small' component='span' icon={iconCompare}>
          <Trans id='Compare ({0})' values={{ 0: compareListCount }} />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={compareList}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {!compareListCount ? (
          <EmptyCompareList />
        ) : (
          <>
            {compareListCount === 1 && (
              <CompareListIntroText>
                <Typography variant='body1'>
                  <Trans id='Add another product to start comparing.' />
                </Typography>
              </CompareListIntroText>
            )}
            <CompareListSelect />
            <Container>
              <CompareListItems
                renderers={productListRenderer}
                sx={(theme) => ({ mb: theme.spacings.lg })}
              />
              <CompareListAttributes
                sx={(theme) => ({ [theme.breakpoints.up('lg')]: { mb: theme.spacings.lg } })}
              />
            </Container>
          </>
        )}
      </WaitForQueries>
    </CompareListForm>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'compare',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
ComparePage.pageOptions = pageOptions

export default ComparePage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  if (!import.meta.graphCommerce.compare) return { notFound: true }

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
