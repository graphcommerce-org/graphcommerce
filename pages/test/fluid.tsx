import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageLayoutProps } from '../../components/PageLayout'
import { LayoutPage } from '../../lib/layout'
import FluidAnimation from '../../components/FluidAnimation'
import { StaticPageVariables } from '../../lib/staticParams'

const Fluid: LayoutPage<PageLayoutProps> = () => {
  return <FluidAnimation colorful={false} curl={1} />
}

Fluid.layout = LayoutFull

export default Fluid

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/', locale: 'nl' }

  const data = await Promise.all([
    import('../../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}
