import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  PageMeta,
  StoreConfigDocument,
  StoreSwitcherList,
  StoreSwitcherListDocument,
  StoreSwitcherListQuery,
} from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconLanguage,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../components'
import { graphqlSsrClient, graphqlSharedClient, graphqlQuery } from '@graphcommerce/graphql-mesh'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'

type RouteProps = { country?: string[] }
type Props = StoreSwitcherListQuery
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props, RouteProps>

function StoresIndexPage({ availableStores }: Props) {
  const { locale } = useRouter()

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Switch stores')} metaRobots={['noindex']} />
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconLanguage}>
          <Trans id='Country' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <LayoutTitle icon={iconLanguage}>
          <Trans id='Country' />
        </LayoutTitle>
        <StoreSwitcherList availableStores={availableStores} locale={locale} />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
StoresIndexPage.pageOptions = pageOptions

export default StoresIndexPage

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async () => {
  const stores = graphqlQuery(StoreSwitcherListDocument)

  return {
    props: {
      ...(await stores).data,
    },
  }
})
