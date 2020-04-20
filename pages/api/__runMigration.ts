/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { NextApiRequest, NextApiResponse } from 'next'
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient, { ApolloError } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'
// @ts-ignore
import {
  CreatePageDocument,
  UpdatePageDocument,
  GetDraftPagesDocument,
  PublishPageDocument,
  GetAllAssetsDocument,
  PublishAssetDocument,
} from '../../generated/apollo'
import { ValueJSON } from '../../components/RichText'

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
    translationTo: LegacyQuery['pages']
    translationFrom: LegacyQuery['pages']
    blogPost: {
      title: string
      content: string
      publicPublishedAt: string
      image: {
        url: string
        fileName: string
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
        fragment Page on Page {
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
          blogPost {
            title
            content
            publicPublishedAt
            image {
              fileName
              url
            }
          }
          singularPage {
            title
            content
          }
        }

        {
          pages(where: { statusCode: CODE_200 }) {
            ...Page
            translationTo {
              ...Page
            }
            translationFrom {
              ...Page
            }
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

    const { data: assetP1 } = await toClient.query<
      GQLGetAllAssetsQuery,
      GQLGetAllAssetsQueryVariables
    >({ query: GetAllAssetsDocument, variables: { skip: 0 } })

    const { data: assetP2 } = await toClient.query<
      GQLGetAllAssetsQuery,
      GQLGetAllAssetsQueryVariables
    >({ query: GetAllAssetsDocument, variables: { skip: 100 } })

    const { data: assetP3 } = await toClient.query<
      GQLGetAllAssetsQuery,
      GQLGetAllAssetsQueryVariables
    >({ query: GetAllAssetsDocument, variables: { skip: 200 } })

    const { data: assetP4 } = await toClient.query<
      GQLGetAllAssetsQuery,
      GQLGetAllAssetsQueryVariables
    >({ query: GetAllAssetsDocument, variables: { skip: 300 } })

    const { data: assetP5 } = await toClient.query<
      GQLGetAllAssetsQuery,
      GQLGetAllAssetsQueryVariables
    >({ query: GetAllAssetsDocument, variables: { skip: 400 } })
    const { data: assetP6 } = await toClient.query<
      GQLGetAllAssetsQuery,
      GQLGetAllAssetsQueryVariables
    >({ query: GetAllAssetsDocument, variables: { skip: 500 } })

    const assets = Object.fromEntries(
      [
        ...assetP1.assets,
        ...assetP2.assets,
        ...assetP3.assets,
        ...assetP4.assets,
        ...assetP5.assets,
        ...assetP6.assets,
      ].map((asset) => [asset.fileName, asset.id]),
    )

    // const slateTransformer: {
    //   fromMarkdown: (markdown: string) => ValueJSON
    // } = new SlateTransformer()

    let slice = 23
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
      } = page

      const url = `/${getUrlFragments({ urlkeynew, parent }).join('/')}`

      if (page.language === 'EN') {
        console.log(`${slice} Skipping EN ${url} ..`)
        // process.stdout.write('skipping, is english 💩\n')
        // eslint-disable-next-line no-continue
        continue // We combine english page with the existing dutch page.
      }

      console.log(`${slice} Importing ${url} ..`)

      const translations = translationTo.filter((translation) => translation.language === 'EN')

      const urlTitles: { [index: string]: string } = {
        '/': 'Home',
        'over-reach-digital-magento-experts': 'Over ons',
        'portfolio-magento-e-commerce-projecten': 'Portfolio',
        'e-commerce-diensten': 'Diensten',
      }
      const title = (urlkey: string) => {
        return (
          urlTitles[urlkey] ?? urlkey.charAt(0).toUpperCase() + urlkey.slice(1).split('-').join(' ')
        )
      }

      const pageData:
        | GQLCreatePageMutationVariables['page']
        | GQLUpdatePageMutationVariables['page'] = {
        title: title(urlkeynew),
        url,
        metaTitle,
        metaDescription: metaDescription ?? 'TODO',
        metaRobots,
      }

      const contentRows: GQLPageContentCreateInput[] = []
      if (blogPost) {
        pageData.title = blogPost.title
        pageData.releaseDate = blogPost.publicPublishedAt

        if (blogPost.image) {
          if (assets[blogPost.image.fileName]) {
            pageData.asset = { connect: { id: assets[blogPost.image.fileName] } }
          } else {
            console.log(`Should have image: ${blogPost.image.fileName}`)
          }
        }

        // contentRows.push({
        //   RowColumnOne: {
        //     identity: url,
        //     colOne: slateTransformer.fromMarkdown(blogPost.content),
        //   },
        // })
      }

      let id: string = urlToId[url]
      if (!id) {
        const variables: GQLCreatePageMutationVariables = {
          page: {
            ...pageData,
            createdAt,
            updatedAt,
            content: { create: contentRows },
            localizations: {
              create: translations.map((translation) => ({
                locale: 'en',
                data: {
                  title: translation.blogPost?.title ?? title(urlkeynew),
                  url: `/${getUrlFragments({
                    urlkeynew: translation.urlkeynew,
                    parent: translation.parent,
                  }).join('/')}`,
                  metaTitle: translation.metaTitle,
                  metaDescription: translation.metaDescription ?? 'TODO',
                },
              })),
            },
          },
        }
        // console.log(JSON.stringify(variables))
        const result = await toClient.mutate<GQLCreatePageMutation, GQLCreatePageMutationVariables>(
          { mutation: CreatePageDocument, variables },
        )

        id = result.data?.createPage?.id!
      } else {
        // console.log(translations)
        // process.stdout.write('updating..')
        await toClient.mutate<GQLUpdatePageMutation, GQLUpdatePageMutationVariables>({
          mutation: UpdatePageDocument,
          variables: {
            id,
            page: {
              ...pageData,
              localizations: {
                update: translations.map((translation) => ({
                  locale: 'en',
                  data: {
                    title: translation.blogPost?.title ?? title(urlkeynew),
                    url: `/${getUrlFragments({
                      urlkeynew: translation.urlkeynew,
                      parent: translation.parent,
                    }).join('/')}`,
                    metaTitle: translation.metaTitle,
                    metaDescription: translation.metaDescription ?? 'TODO',
                  },
                })),
              },
            },
          },
        })
      }

      if (status === 'PUBLISHED') {
        // pr:ocess.stdout.write('publishing..')
        const { data } = await toClient.mutate<
          GQLPublishPageMutation,
          GQLPublishPageMutationVariables
        >({
          mutation: PublishPageDocument,
          variables: { id, locales: translations.length > 0 ? ['en'] : [] },
        })

        const assetId = data?.publishPage?.asset?.id

        if (assetId) {
          await toClient.mutate<GQLPublishAssetMutation, GQLPublishAssetMutationVariables>({
            mutation: PublishAssetDocument,
            variables: { id: assetId, locales: [] },
          })
        }
      }
    }

    process.stdout.write('done 🥳\n')
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

  res.end()
}
