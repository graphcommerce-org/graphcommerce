/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { NextApiRequest, NextApiResponse } from 'next'
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient, { ApolloError } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'
import {
  GetStaticPathsDocument,
  CreatePageDocument,
  UpdatePageDocument,
  GetDraftPagesDocument,
  PublishPageDocument,
} from '../../generated/apollo'

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

type LegacyUrl = null | {
  urlkeynew: string
  parent: LegacyUrl
}
type LegacyLang = 'NL' | 'EN'
type LegacyQuery = {
  pages: {
    createdAt: string
    updatedAt: string
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    id: string
    urlkeynew: string
    metaTitle: string
    metaDescription: string
    metaRobots: 'INDEX_FOLLOW' | 'INDEX_NOFOLLOW' | 'NOINDEX_FOLLOW' | 'NOINDEX_NOFOLLOW'
    parent: LegacyUrl
    language: LegacyLang
    translationTo: {
      language: LegacyLang
      urlkeynew: string
    }[]
    translationFrom: {
      language: LegacyLang
      urlkeynew: string
    }[]
    blogPost: {
      title: string
      content: string
      publicPublishedAt: string
      image: {
        url: string
      }
    }
    singularPage: {
      title: string
      content: string
    }
  }[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { GRAPHQL, GRAPHQL_BEARER, GRAPHQL_LEGACY, GRAPHQL_LEGACY_BEARER } = process.env

    const toClient = createApolloClient(GRAPHQL ?? '', GRAPHQL_BEARER ?? '')
    const fromClient = createApolloClient(GRAPHQL_LEGACY ?? '', GRAPHQL_LEGACY_BEARER ?? '')

    const fromData = await fromClient.query<LegacyQuery>({
      query: gql`
        {
          pages(where: { statusCode: CODE_200 }) {
            createdAt
            updatedAt
            status
            id
            urlkeynew
            metaTitle
            metaDescription
            metaRobots
            parent {
              urlkeynew
              parent {
                urlkeynew
                parent {
                  urlkeynew
                }
              }
            }
            language
            translationTo {
              language
              urlkeynew
            }
            translationFrom {
              language
              urlkeynew
            }
            blogPost {
              title
              content
              publicPublishedAt
              image {
                url
              }
            }
            singularPage {
              title
              content
            }

            #    jobListing {} NOT MIGRATED
            #    structuredPage  {} NOT MIGRATED
          }
        }
      `,
    })

    const getUrlFragments = (page: LegacyUrl) => {
      let urlFragments: string[] = []

      if (!page) {
        return urlFragments
      }

      if (page.parent) {
        urlFragments = [...urlFragments, ...getUrlFragments(page.parent)]
      }

      urlFragments.push(
        page.urlkeynew
          .split('/')
          .filter((x) => x)
          .join('/'),
      )
      return urlFragments
    }

    const { data: draftpages1 } = await toClient.query<
      GQLGetDraftPagesQuery,
      GQLGetDraftPagesQueryVariables
    >({ query: GetDraftPagesDocument, variables: {} })
    const { data: draftpages2 } = await toClient.query<
      GQLGetDraftPagesQuery,
      GQLGetDraftPagesQueryVariables
    >({ query: GetDraftPagesDocument, variables: { skip: 100 } })
    const { data: draftpages3 } = await toClient.query<
      GQLGetDraftPagesQuery,
      GQLGetDraftPagesQueryVariables
    >({ query: GetDraftPagesDocument, variables: { skip: 200 } })

    const draftpages = [
      ...draftpages1!.pages.map((page) => [page.url, page.id]),
      ...draftpages2!.pages.map((page) => [page.url, page.id]),
      ...draftpages3!.pages.map((page) => [page.url, page.id]),
    ]
    const urlToId = Object.fromEntries(draftpages)

    let slice = 0
    console.log(fromData.data.pages.slice(slice).length)
    for (const page of fromData.data.pages.slice(slice)) {
      slice += 1

      const {
        urlkeynew,
        parent,
        blogPost,
        metaTitle,
        metaDescription,
        createdAt,
        updatedAt,
        metaRobots,
        status,
        translationTo,
        translationFrom,
      } = page

      const url = `/${getUrlFragments({ urlkeynew, parent }).join('/')}`

      process.stdout.write(`${slice} Importing ${url} ..`)

      if (page.language === 'EN') {
        process.stdout.write('skipping, is english 💩\n')
        // eslint-disable-next-line no-continue
        continue // We combine english page with the existing dutch page.
      }

      const pageData = {
        title: blogPost?.title ?? metaTitle,
        url,
        metaTitle,
        metaDescription: metaDescription ?? 'TODO',
        metaRobots,
      }

      if (translationTo.length || translationFrom.length) {
        console.log(translationTo, translationFrom)
      }

      let id: string = urlToId[url]
      if (!id) {
        process.stdout.write('creating..')
        // if (slice === 98) {
        //   console.log({ ...pageData, createdAt, updatedAt })
        // }

        const result = await toClient.mutate<GQLCreatePageMutation, GQLCreatePageMutationVariables>(
          {
            mutation: CreatePageDocument,
            variables: {
              page: { ...pageData, createdAt, updatedAt },
            },
          },
        )

        id = result.data?.createPage?.id!
      } else {
        process.stdout.write('updating..')
        await toClient.mutate<GQLUpdatePageMutation, GQLUpdatePageMutationVariables>({
          mutation: UpdatePageDocument,
          variables: { id, page: { ...pageData } },
        })
      }

      if (status === 'PUBLISHED') {
        process.stdout.write('publishing..')
        await toClient.mutate<GQLPublishPageMutation, GQLPublishPageMutationVariables>({
          mutation: PublishPageDocument,
          variables: { id, locales: [] },
        })
      }

      process.stdout.write('done 🥳\n')
    }

    res.status(200).end()
  } catch (error) {
    if ((error as ApolloError).networkError) {
      const apolloError = error as ApolloError
      console.log(JSON.stringify(apolloError.networkError?.result))
    } else {
      console.log(error)
    }
    res.status(500).end()
  }

  res.end()
}
