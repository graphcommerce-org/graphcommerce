import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import FluidAnimation from 'components/FluidAnimation'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

const Fluid: PageWithLayoutFull = () => {
  return <FluidAnimation colorful={false} curl={1} />
}

Fluid.layout = LayoutFull

export default Fluid

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayoutProps({ url: '/', locale: 'nl' }),
})
