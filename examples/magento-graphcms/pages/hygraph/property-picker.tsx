import { getProductsDocument, getProductsQuery, PropertyPicker } from '@graphcommerce/hygraph-app'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps } from '@graphcommerce/next-ui'
import { Wrapper } from '@hygraph/app-sdk-react'
import { Container } from '@mui/material'
import React from 'react'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type DRPropertyPickerProps = NonNullable<getProductsQuery>

type GetPageStaticProps = GetStaticProps<DRPropertyPickerProps>

export default function DRPropertyPicker(props: DRPropertyPickerProps) {
  const { products } = props
  const fieldContainer = React.useRef(null)
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const framerParent = fieldContainer?.current?.parentElement
    framerParent.style.position = 'static'
    framerParent.style.minHeight = 'unset'

    const framerParent2 = framerParent?.previousSibling
    framerParent2.style.minHeight = 'unset'

    const body = framerParent.parentElement.parentElement
    body.style.background = 'transparent'
  }, [fieldContainer])

  return (
    <Container ref={fieldContainer} sx={{ px: { xs: '0' } }}>
      <Wrapper>
        <PropertyPicker products={products} />
      </Wrapper>
    </Container>
  )
}

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const staticClient = graphqlSsrClient(locale)
  const client = graphqlSharedClient(locale)
  const products = staticClient.query({ query: getProductsDocument })
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      ...(await products).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
