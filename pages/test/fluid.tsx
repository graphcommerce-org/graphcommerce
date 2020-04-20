import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../../components/PageLayout'
import FluidAnimation from '../../components/FluidAnimation'
import { StaticPageVariables } from '../../lib/staticParams'

const Fluid: PageWithLayoutFull = () => {
  return <FluidAnimation colorful={false} curl={1} />
}

Fluid.layout = LayoutFull

export default Fluid

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/', locale: 'nl' }
  const getStaticData = await import('../../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
