import { NextApiRequest, NextApiResponse } from 'next'
import gql from 'graphql-tag'
import ApolloClient, { ApolloError } from 'apollo-client'
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import fs from 'fs'

function createApolloClient(
  uri: string,
  Authorization: string,
): ApolloClient<NormalizedCacheObject> {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri,
      headers: { Authorization },
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache(),
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { GRAPHQL_LEGACY, GRAPHQL_LEGACY_BEARER } = process.env

    const fromClient = createApolloClient(GRAPHQL_LEGACY ?? '', GRAPHQL_LEGACY_BEARER ?? '')

    const { data } = await fromClient.query<{
      assets: Array<{ url: string; fileName: string }>
    }>({
      query: gql`
        query {
          assets {
            url
            fileName
          }
        }
      `,
    })

    let count = 1

    // eslint-disable-next-line no-restricted-syntax
    for await (const { url, fileName } of data.assets) {
      const result = await fetch(url)
      const dir = Math.ceil(count / 50)
      const target = `/Users/paulhachmang/Sites/reachdigital-next/legacyassets/${dir}/${fileName}`
      await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(target)
        result.body?.pipe(fileStream)
        result.body?.on('error', reject)
        fileStream.on('finish', resolve)
      })
      count += 1
      console.log(count)
    }
    console.log('done')

    res.status(200).end()
  } catch (error) {
    if ((error as ApolloError).networkError) {
      const apolloError = error as ApolloError
      // @ts-ignore
      console.log(JSON.stringify(apolloError.networkError?.result))
    } else {
      console.log(error)
    }
    res.status(500).end()
  }
}
