import type { ParsedUrlQuery } from 'querystring'
import { usePrevPageRouter, type PageOptions } from '@graphcommerce/framer-next-pages'
import type { StoreSwitcherListQuery } from '@graphcommerce/magento-store'
import {
  PageMeta,
  StoreConfigDocument,
  StoreSwitcherApplyButton,
  StoreSwitcherCurrencySelector,
  StoreSwitcherFormProvider,
  StoreSwitcherGroupSelector,
  StoreSwitcherLinkOrButton,
  StoreSwitcherListDocument,
  StoreSwitcherStoreSelector,
  storeToLocale,
} from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FormActions,
  iconLanguage,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionHeader,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../components'
import { LayoutDocument, LayoutOverlay } from '../components'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

type RouteProps = ParsedUrlQuery
type Props = StoreSwitcherListQuery
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props, RouteProps>

function StoresIndexPage({ availableStores }: Props) {
  const prev = usePrevPageRouter()
  const router = useRouter()

  return (
    <StoreSwitcherFormProvider
      availableStores={availableStores}
      onSubmit={async (data) =>
        prev?.asPath && prev?.locale === storeToLocale(data.storeCode)
          ? router.back()
          : router.push(prev?.asPath ?? '/', undefined, {
              locale: storeToLocale(data.storeCode),
              scroll: false,
            })
      }
    >
      <PageMeta title={t`Switch stores`} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        primary={
          <StoreSwitcherLinkOrButton color='secondary' button={{ variant: 'pill' }}>
            <Trans>Save</Trans>
          </StoreSwitcherLinkOrButton>
        }
      >
        <LayoutTitle size='small' component='span' icon={iconLanguage}>
          <Trans>Store Settings</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='sm' sx={(theme) => ({ mb: theme.spacings.lg })}>
        <LayoutTitle icon={iconLanguage}>
          <Trans>Store Settings</Trans>
        </LayoutTitle>
        <StoreSwitcherGroupSelector
          // header={<SectionHeader labelLeft='Country' />}
          showStores={1}
          showCurrencies={1}
        />
        <StoreSwitcherStoreSelector
          header={<SectionHeader labelLeft='Store' />}
          showCurrencies={1}
        />
        <StoreSwitcherCurrencySelector header={<SectionHeader labelLeft='Currency' />} />

        <FormActions>
          <StoreSwitcherApplyButton color='secondary' variant='pill' size='large'>
            <Trans>Save</Trans>
          </StoreSwitcherApplyButton>
        </FormActions>
      </Container>
    </StoreSwitcherFormProvider>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'right', sizeMd: 'floating', justifyMd: 'start' },
}
StoresIndexPage.pageOptions = pageOptions

export default StoresIndexPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({ query: LayoutDocument })
  const stores = staticClient.query({ query: StoreSwitcherListDocument })

  return {
    props: {
      ...(await stores).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
