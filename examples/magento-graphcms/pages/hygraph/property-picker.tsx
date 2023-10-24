import { PropertyPicker } from '@graphcommerce/hygraph-app'
import {
  createOptionsFromInterfaceObject,
  objectifyGraphQLInterface,
  fetchGraphQLInterface,
} from '@graphcommerce/hygraph-app/lib'
import { InterfaceObject } from '@graphcommerce/hygraph-app/types'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps } from '@graphcommerce/next-ui'
import { Wrapper } from '@hygraph/app-sdk-react'
import { Container } from '@mui/material'
import React from 'react'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Interface = {
  __type: any
}
type DRPropertyPickerProps = Interface

type GetPageStaticProps = GetStaticProps<DRPropertyPickerProps>

export default function DRPropertyPicker(props: DRPropertyPickerProps) {
  const { __type } = props
  const { fields } = __type
  const fieldContainer = React.useRef(null)

  const options = createOptionsFromInterfaceObject(
    objectifyGraphQLInterface(fields as InterfaceObject),
  )

  React.useEffect(() => {
    /**
     * Some styling is being undone here to resolve conflicts between Hygraph App SDK and CssAndFramerMotionProvider.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const frameBox1 = fieldContainer?.current?.parentElement
    frameBox1.style.position = 'static'
    frameBox1.style.minHeight = 'unset'

    const frameBox2 = frameBox1?.previousSibling
    frameBox2.style.minHeight = 'unset'

    const body = frameBox1.parentElement.parentElement
    body.style.background = 'transparent'
    body.style.height = '200px'
    body.style.overflow = 'hidden'
  }, [fieldContainer])

  return (
    <Container ref={fieldContainer} sx={{ px: { xs: '0' } }}>
      <Wrapper>
        <PropertyPicker options={options} />
      </Wrapper>
    </Container>
  )
}

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const staticClient = graphqlSsrClient(locale)
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const graphQLInterface = fetchGraphQLInterface(staticClient)

  return {
    props: {
      ...(await graphQLInterface).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
