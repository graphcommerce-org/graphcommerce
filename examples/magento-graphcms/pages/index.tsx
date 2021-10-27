import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta } from '@graphcommerce/magento-store'
import React from 'react'
import FullPageShell from '../components/AppShell/FullPageShell'
import RowAudienceGrid from '../components/Home/RowAudienceGrid'
import RowFeatureColumnTwo from '../components/Home/RowFeatureColumnTwo'
import RowFeatureGrid from '../components/Home/RowFeatureGrid'
import RowFeatureGridColumnTwo from '../components/Home/RowFeatureGridColumnTwo'
import RowHeroAnimation from '../components/Home/RowHeroAnimation'
import RowListColumnTwo from '../components/Home/RowListColumnTwo'
import RowWireframeAnimation from '../components/Home/RowWireframeAnimaton'
import { LightTheme } from '../components/Theme/ThemedProvider'

export const config = { unstable_JsPreload: false }

function Home() {
  return (
    <>
      <PageMeta title={'GraphCommerce'} metaDescription={''} />
      <RowHeroAnimation />
      <LightTheme>
        <RowFeatureGrid />
      </LightTheme>
      <RowFeatureColumnTwo />
      <LightTheme>
        <RowFeatureGridColumnTwo />
      </LightTheme>
      <RowWireframeAnimation />
      <LightTheme>
        <RowAudienceGrid />
      </LightTheme>
      <RowListColumnTwo />
    </>
  )
}

Home.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default Home
