import Head from 'next/head'
import React from 'react'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Thing, WithContext } from 'schema-dts'

type JsonLdProps<T extends Thing> = {
  item: WithContext<T>
}

export default function JsonLd<T extends Thing>(props: JsonLdProps<T>) {
  const { item } = props

  return (
    <Head>
      <script key='jsonld' {...jsonLdScriptProps<T>(item)} />
    </Head>
  )
}
