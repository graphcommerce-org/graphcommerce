import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { LayoutTitle, GetStaticProps, ActionableCard } from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

export default function ActionableCardPage() {
  return (
    <Container>
      <LayoutTitle variant='h1'>Actionable Card</LayoutTitle>
      <ActionableCard price={<Money currency='EUR' value={19.95} />} actions={['Hoi', 'hoi2']} />
    </Container>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
ActionableCardPage.pageOptions = pageOptions

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
