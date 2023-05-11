import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  enhanceStaticPaths,
  enhanceStaticProps,
  urlFromParams,
} from '@graphcommerce/next-ui/server'
import { InferGetStaticPropsType } from 'next'
import { LayoutNavigation } from '../../components'
import { getLayout } from '../../components/Layout/layout'
import { LayoutDemo } from './minimal-page-shell/[[...url]]'

function TestOverview(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <LayoutDemo baseUrl='/test' />
}

TestOverview.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default TestOverview

export const getStaticPaths = enhanceStaticPaths('blocking', ({ locale }) =>
  [['index', 'other']].map((url) => ({ params: { url }, locale })),
)

export const getStaticProps = enhanceStaticProps(getLayout, async ({ params }) => {
  const url = urlFromParams(params)

  return {
    props: {
      url,
      up: { href: '/', title: 'Home' },
    },
  }
})
