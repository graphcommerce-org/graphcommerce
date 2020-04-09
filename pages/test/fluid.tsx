import React from 'react'
import { GQLLocale } from '../../generated/graphql'
import LayoutFull, { PageLayoutProps } from '../../components/PageLayout'
import { GetStaticProps } from '../../lib/staticParams'
import { LayoutPage } from '../../lib/layout'
import FluidAnimation from '../../components/FluidAnimation'

const Fluid: LayoutPage<PageLayoutProps> = () => {
  return <FluidAnimation colorful={false} curl={1} />
}

Fluid.layout = LayoutFull

export default Fluid

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params = { url: '/', locale: GQLLocale.Nl }

  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticData').then((module) =>
      module.default({ params }),
    ),
    import('../../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default({ params }),
    ),
  ])

  return { props: { ...data[0].props, ...data[1].props } }
}
