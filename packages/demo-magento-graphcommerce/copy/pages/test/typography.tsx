import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { LayoutHeader, LayoutTitle } from '@graphcommerce/next-ui'
import type { GetStaticProps } from '@graphcommerce/next-ui/Page/types'
import { i18n } from '@lingui/core'
import { Container, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import type { LayoutMinimalProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

function useRenderedSize() {
  const [size, setSize] = useState<string>()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current?.parentElement) return () => {}
    const ro = new ResizeObserver(([entry]) => {
      setSize(getComputedStyle(entry.target).fontSize)
    })
    ro.observe(ref.current.parentElement)
    return () => ro.disconnect()
  }, [])

  return <span ref={ref}>{size}</span>
}

function TypographyOverview() {
  return (
    <>
      <LayoutHeader>
        <LayoutTitle size='small'>Typography</LayoutTitle>
      </LayoutHeader>

      <LayoutTitle>Typography</LayoutTitle>

      <Container>
        <Typography variant='h1' display='block' gutterBottom>
          Headline 1 {useRenderedSize()}
        </Typography>

        <Typography variant='h2' display='block' gutterBottom>
          Headline 2 {useRenderedSize()}
        </Typography>

        <Typography variant='h3' display='block' gutterBottom>
          Headline 3 {useRenderedSize()}
        </Typography>

        <Typography variant='h4' display='block' paragraph gutterBottom>
          Headline 4 — Maecenas efficitur velit a metus.
          {useRenderedSize()}
        </Typography>

        <Typography variant='h5' display='block' gutterBottom>
          Headline 5 — Morbi posuere nunc diam {useRenderedSize()}
        </Typography>

        <Typography variant='h6' display='block' gutterBottom>
          Headline 6 — Ut luctus mi ante {useRenderedSize()}
        </Typography>

        <Typography variant='subtitle1' display='block' paragraph gutterBottom>
          Subtitle 1 — In dictum velit quis lorem dignissim volutpat. {useRenderedSize()}
        </Typography>

        <Typography variant='body1' display='block' paragraph gutterBottom>
          Body1 — Maecenas efficitur velit a metus feugiat egestas. Donec sit amet maximus sapien,
          in malesuada mi. Duis eget finibus urna, vitae suscipit felis. Duis aliquet tortor a
          turpis euismod gravida. Nunc eu hendrerit leo. Integer dapibus dapibus augue, sit amet
          semper lacus. Sed sed enim et quam tincidunt sollicitudin. Curabitur eget dignissim lorem.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer maximus ex at
          placerat egestas. Vivamus vehicula nisl urna, nec congue nisl ultricies nec.{' '}
          {useRenderedSize()}
        </Typography>

        <Typography variant='subtitle2' display='block' gutterBottom>
          Subtitle 2 — Nunc eu hendrerit leo {useRenderedSize()}
        </Typography>

        <Typography variant='body2' display='block' paragraph gutterBottom>
          Body2 — Suspendisse nec consectetur massa. Proin mollis ante lorem, a lacinia orci
          pellentesque ut. Donec porta fringilla commodo. In hac habitasse platea dictumst. Donec
          quis elementum mauris. Cras rutrum lectus et magna convallis, vitae dignissim elit
          euismod. Aliquam leo felis, viverra eget auctor sed, dictum vitae metus. Nullam tincidunt
          ultricies convallis. Donec pretium, dolor sed dapibus gravida, magna metus posuere sem,
          nec tincidunt erat eros vel erat. Ut eu quam sit amet magna condimentum aliquet. Nulla
          facilisis est nec quam mollis porta. Nullam mattis pulvinar purus eu gravida. Nullam
          interdum malesuada sodales. Maecenas aliquam pulvinar libero non consectetur.{' '}
          {useRenderedSize()}
        </Typography>

        <Typography variant='button' display='block' gutterBottom>
          Button: Sed laoreet {useRenderedSize()}
        </Typography>

        <Typography variant='caption' display='block' gutterBottom>
          Caption: vitae enim quis cursus. {useRenderedSize()}
        </Typography>

        <Typography variant='overline' display='block' gutterBottom>
          Overline: Nunc scelerisque at massa nec imperdiet {useRenderedSize()}
        </Typography>
      </Container>
    </>
  )
}

TypographyOverview.pageOptions = {
  Layout: LayoutMinimal,
} as PageOptions

export default TypographyOverview

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
