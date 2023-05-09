import { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  PageMeta,
  StoreSwitcherList,
  StoreSwitcherListDocument,
  StoreSwitcherListQuery,
} from '@graphcommerce/magento-store'
import { iconLanguage, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { LayoutOverlay } from '../components'
import { getLayout } from '../components/Layout/layout'

type Props = StoreSwitcherListQuery

function StoresIndexPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { availableStores } = props
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

const pageOptions: PageOptions = {
  overlayGroup: 'left',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'left' },
}
StoresIndexPage.pageOptions = pageOptions

export default StoresIndexPage

export const getStaticProps = enhanceStaticProps(getLayout, async () => {
  const stores = graphqlQuery(StoreSwitcherListDocument)
  return { props: { ...(await stores).data } }
})
