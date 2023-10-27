import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { loadConfig } from '@graphcommerce/next-config'
import { Wrapper } from '@hygraph/app-sdk-react'
import React from 'react'
import { PropertyPicker } from '..'
import {
  createOptionsFromInterfaceObject,
  objectifyGraphQLInterface,
  fetchGraphQLInterface,
} from '../lib'
import { Interface } from '../types'

type PropertyPickerProps = Interface

export default function DRPropertyPicker(props: PropertyPickerProps) {
  const { __type } = props
  const { fields } = __type
  const fieldContainer = React.useRef<HTMLDivElement | null>(null)

  // Todo: this can be optimized in a future version. Instead of running the functions twice we can return an object with both options. For now this is fine.
  const numberOptions = React.useMemo(
    () =>
      createOptionsFromInterfaceObject(
        objectifyGraphQLInterface(fields, 'number', ['ProductInterface']),
      ),
    [fields],
  )

  const textOptions = React.useMemo(
    () =>
      createOptionsFromInterfaceObject(
        objectifyGraphQLInterface(fields, 'text', ['ProductInterface']),
      ),
    [fields],
  )

  // We manually add url to options because it is supported by DynamicRows but is not included in the ProductInterface.
  const options = React.useMemo(() => {
    return {
      text: [...textOptions, { label: 'url', id: 'url' }].sort((a, b) => {
        if (!a.label.includes('.') && !b.label.includes('.')) {
          return a.label.localeCompare(b.label)
        }
        if (a.label.includes('.')) {
          return 1
        }
        return -1
      }),
      number: [...numberOptions, { label: 'url', id: 'url' }],
    }
  }, [numberOptions, textOptions])

  React.useEffect(() => {
    /**
     * Some styling is being undone here to resolve conflicts between Hygraph App SDK and CssAndFramerMotionProvider.
     */

    const frameBox1 = fieldContainer?.current?.parentElement
    if (frameBox1) {
      frameBox1.style.position = 'static'
      frameBox1.style.minHeight = 'unset'
    }

    const frameBox2 = frameBox1?.previousSibling as HTMLDivElement | null
    if (frameBox2) {
      frameBox2.style.minHeight = 'unset'
    }

    const body = frameBox1?.parentElement
    if (body) {
      body.style.margin = '0'
    }

    const html = body?.parentElement
    if (html) {
      html.style.background = 'transparent'
      html.style.overflow = 'hidden'
    }
  }, [fieldContainer])

  return (
    <div ref={fieldContainer}>
      <Wrapper>
        <PropertyPicker options={options} />
      </Wrapper>
    </div>
  )
}

export const getStaticProps = async () => {
  const config = loadConfig(process.cwd())
  const staticClient = new ApolloClient({
    link: new HttpLink({
      uri: config.magentoEndpoint,
      fetch,
    }),
    cache: new InMemoryCache(),
  })
  const graphQLInterface = fetchGraphQLInterface(staticClient)

  return {
    props: {
      ...(await graphQLInterface).data,
    },
  }
}
