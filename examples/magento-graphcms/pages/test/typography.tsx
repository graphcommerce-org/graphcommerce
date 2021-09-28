import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps } from '@graphcommerce/next-ui/Page/types'
import { Typography, Container } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<MinimalPageShellProps, Props>

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
  })

  return <span ref={ref}>{size}</span>
}

function TypographyOverview() {
  return (
    <Container>
      <Typography variant='h1' display='block'>
        Headline 1 {useRenderedSize()}
      </Typography>
      <Typography variant='caption'>
        Gebruik: Aantal woorden, Voorbeeld: Product description title / Category title
      </Typography>

      <Typography variant='h2' display='block'>
        Headline 2 {useRenderedSize()}
      </Typography>
      <Typography variant='caption'>Gebruik: Aantal woorden, Voorbeeld: Product title</Typography>

      <Typography variant='h3' display='block'>
        Headline 3 {useRenderedSize()}
      </Typography>
      <Typography variant='caption'>Gebruik: Aantal woorden, Voorbeeld: ??</Typography>

      <Typography variant='h4' display='block' paragraph>
        Headline 4 — Maecenas efficitur velit a metus feugiat egestas. Donec sit amet maximus
        sapien, in malesuada mi. Duis eget finibus urna, vitae suscipit felis. Duis aliquet tortor a
        turpis euismod gravida. Nunc eu hendrerit leo. Gebruik: Aantal regels tekst.
        {useRenderedSize()}
      </Typography>
      <Typography variant='caption'>Gebruik: One paragraph, Voorbeeld: Product pagina</Typography>

      <Typography variant='h5' display='block'>
        Headline 5 — Morbi posuere nunc diam {useRenderedSize()}
      </Typography>
      <Typography variant='caption'>Gebruik: ??, Voorbeeld: ??</Typography>

      <Typography variant='h6' display='block'>
        Headline 6 — Ut luctus mi ante {useRenderedSize()}
      </Typography>
      <Typography variant='caption'>Gebruik: ??, Voorbeeld: ??</Typography>

      <Typography variant='subtitle1' display='block' paragraph>
        Subtitle 1 — In dictum velit quis lorem dignissim volutpat. {useRenderedSize()}
      </Typography>
      <Typography variant='caption'>
        Gebruik: Als één of twee regels tekst onder een titel, Voorbeeld: 404 pagina bijvoorbeeld
      </Typography>

      <Typography variant='body1' display='block' paragraph>
        Body1 — Maecenas efficitur velit a metus feugiat egestas. Donec sit amet maximus sapien, in
        malesuada mi. Duis eget finibus urna, vitae suscipit felis. Duis aliquet tortor a turpis
        euismod gravida. Nunc eu hendrerit leo. Integer dapibus dapibus augue, sit amet semper
        lacus. Sed sed enim et quam tincidunt sollicitudin. Curabitur eget dignissim lorem. Interdum
        et malesuada fames ac ante ipsum primis in faucibus. Integer maximus ex at placerat egestas.
        Vivamus vehicula nisl urna, nec congue nisl ultricies nec. {useRenderedSize()}
      </Typography>
      <Typography variant='caption' display='block'>
        Gebruik: Reguliere teksten, Voorbeeld: Product specs, &ldquo;How I track my
        package&rdquo;-tekst
      </Typography>

      <Typography variant='subtitle2' display='block'>
        Subtitle 2 — Gebruik: Titles kleiner dan body1, Voorbeeld: Dispatched and Sold by
        GraphCommerce© {useRenderedSize()}
      </Typography>
      <Typography variant='caption' display='block'>
        Gebruik: Reguliere teksten, Voorbeeld: Product specs, &ldquo;How I track my
        package&rdquo;-tekst
      </Typography>

      <Typography variant='body2' display='block' paragraph>
        Body2 — Suspendisse nec consectetur massa. Proin mollis ante lorem, a lacinia orci
        pellentesque ut. Donec porta fringilla commodo. In hac habitasse platea dictumst. Donec quis
        elementum mauris. Cras rutrum lectus et magna convallis, vitae dignissim elit euismod.
        Aliquam leo felis, viverra eget auctor sed, dictum vitae metus. Nullam tincidunt ultricies
        convallis. Donec pretium, dolor sed dapibus gravida, magna metus posuere sem, nec tincidunt
        erat eros vel erat. Ut eu quam sit amet magna condimentum aliquet. Nulla facilisis est nec
        quam mollis porta. Nullam mattis pulvinar purus eu gravida. Nullam interdum malesuada
        sodales. Maecenas aliquam pulvinar libero non consectetur. {useRenderedSize()}
      </Typography>
      <Typography variant='caption' display='block'>
        Gebruik: Minder relevante teksten. Voorbeeld: ???
      </Typography>

      <Typography variant='button' display='block'>
        Sed laoreet {useRenderedSize()}
      </Typography>
      <Typography variant='caption' display='block'>
        Gebruik: Button teksten, Voorbeeld: ??
      </Typography>

      <Typography variant='caption' display='block'>
        vitae enim quis cursus. {useRenderedSize()}
      </Typography>
      <Typography variant='caption' display='block'>
        Gebruik: Eén of twee zinnen max. Voorbeeld: Validatie meldingen in formulieren en formulier
        labels, Next Day Delivery op product page
      </Typography>

      <Typography variant='overline' display='block'>
        Nunc scelerisque at massa nec imperdiet {useRenderedSize()}
      </Typography>
      <Typography variant='caption' display='block'>
        Gebruik: Reguliere teksten, Voorbeeld: Product specs, &ldquo;How I track my
        package&rdquo;-tekst
      </Typography>
    </Container>
  )
}

TypographyOverview.pageOptions = {
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'page',
} as PageOptions

export default TypographyOverview

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: '/test/typography',
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
