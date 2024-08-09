/* eslint-disable import/no-extraneous-dependencies */
import {
  GcMetaTag,
  MeshContext,
  MetaRobots,
  PageContent,
  ProductInterface,
  ResolversTypes,
  RowCategory,
  RowProduct,
  type Resolvers,
} from '@graphcommerce/graphql-mesh'
import { Kind, responsePathAsArray } from 'graphql'

const normalizeUrl = (href: string) => {
  const cleanedhref = href.replaceAll(/^\/|\/$/g, '')
  return `/${cleanedhref === 'page/home' ? '' : cleanedhref}`
}

const denormalizeUrl = (href: string) => {
  const cleanedhref = href.replaceAll(/^\/|\/$/g, '')
  return cleanedhref === '' ? 'page/home' : cleanedhref
}

type GCPageResolver = NonNullable<Resolvers['SimpleProduct']>['page']

export const contextData = new WeakMap<MeshContext, Record<string, ProductInterface>>()

function initContextData(context: MeshContext) {
  let value = contextData.get(context)
  if (!value) {
    value = {}
    contextData.set(context, value)
  }
  return value
}

export function setProduct(context: MeshContext, key: string, entity: ProductInterface) {
  const value = initContextData(context)
  value[key] = entity
}
export function getProduct(context: MeshContext, key: string): ProductInterface | undefined {
  const value = initContextData(context)
  return value[key]
}

function isRowProduct(row: PageContent): row is RowProduct {
  return '__typename' in row && row.__typename === 'RowProduct'
}

const pageProductResolver: GCPageResolver = {
  selectionSet: `{url_key}`,
  resolve: async (root, args, context, info) => {
    if (!root.url_key) return null

    setProduct(context, root.url_key, root)

    // console.log(root)
    return context.hygraph.Query.pages({
      context,
      info,
      root,
      key: root.url_key,
      argsFromKeys: (keys) => ({
        where: {
          url_in: [
            'product/global',
            // ...keys.map((key) => `p/${key}`)
          ],
        },
      }),
      valuesFromResults: (results, keys) =>
        keys.map((key) => {
          const page =
            // results.find((r) => r.url === `p/${key}`) ??
            results.find((r) => r.url === 'product/global')
          if (!page) return null

          page.content.forEach((row) => {
            if (isRowProduct(row)) row.identity = key
          })

          return page
        }),
    })
  },
}

export const resolvers: Resolvers = {
  // Resolve the query `page` to a page with the given URL
  Query: {
    page: {
      resolve: async (root, args, context, info) => {
        const page = await context.hygraph.Query.pages({
          root,
          info,
          context,
          args: { where: { url: denormalizeUrl(args.input.href) } },
        }).then((r) => r[0])

        console.log('oage')

        function mapRowProduct(row: RowProduct): RowCategory & { __typename: 'RowCategory' } {
          const newRow: Partial<RowCategory & { __typename: 'RowCategory' }> = {
            __typename: 'RowCategory',
          }
          if (row.id) newRow.id = row.id
          if (row.locale) newRow.locale = row.locale
          if (row.stage) newRow.stage = row.stage
          if (row.localizations) newRow.localizations = row.localizations.map(mapRowProduct)
          if (row.identity) newRow.categoryUrl = row.identity
          if (row.pages) newRow.pages = row.pages
          if (row.variant) newRow.variant = row.variant as 'Swipeable' | 'Grid'
          return newRow as RowCategory & { __typename: 'RowCategory' }
        }

        page.content = page.content.map((row) =>
          isRowProduct(row) && row.variant && ['Swipeable', 'Grid'].includes(row.variant)
            ? mapRowProduct(row)
            : row,
        )

        return page
      },
    },
  },

  Page: {
    content: {
      resolve: (root) => {
        console.log('content')
        return root.content
      },
    },
    rows: {
      selectionSet: (root) => ({
        kind: Kind.SELECTION_SET,
        selections: [
          {
            kind: Kind.FIELD,
            name: { kind: Kind.NAME, value: 'content' },
            selectionSet: {
              kind: Kind.SELECTION_SET,
              selections:
                root.selectionSet?.selections?.filter(
                  (selection) =>
                    selection.kind !== Kind.FIELD ||
                    !['product', 'category'].includes(selection.name.value),
                ) ?? [],
            },
          },
        ],
      }),
      resolve: (root) => {
        console.log('rows')
        return root.content
      },
    },
    head: {
      selectionSet: `{
        id
        url
        locale
        metaTitle
        metaDescription
        metaRobots
        localizations(includeCurrent: false) {
          locale
          url
          metaRobots
        }
      }`,
      resolve: ({ head, url, locale, metaRobots, metaDescription, metaTitle, localizations }) => {
        function formatRobots(bots?: MetaRobots, name: string = 'robots'): GcMetaTag {
          const robots: string[] = []
          if (bots?.includes('NOINDEX')) robots.push('noindex')
          if (bots?.includes('NOFOLLOW')) robots.push('nofollow')
          return { name, content: robots.length > 0 ? robots.join(', ') : 'all' }
        }

        return (
          head ?? {
            canonical: { rel: 'canonical', href: normalizeUrl(url), hreflang: locale },
            robots: [formatRobots(metaRobots)],
            alternate: localizations
              ?.filter((v) => !formatRobots(v.metaRobots).content.includes('noindex'))
              ?.map((loc) => ({
                rel: 'alternate',
                href: normalizeUrl(loc.url),
                hreflang: loc.locale,
              })),
            title: metaTitle,
            description: metaDescription,
          }
        )
      },
    },
  },

  SimpleProduct: { page: pageProductResolver },
  ConfigurableProduct: { page: pageProductResolver },
  BundleProduct: { page: pageProductResolver },
  VirtualProduct: { page: pageProductResolver },
  DownloadableProduct: { page: pageProductResolver },
  GroupedProduct: { page: pageProductResolver },

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore GiftCardProduct is only available in Commerce
  GiftCardProduct: { page: pageProductResolver },

  RowProduct: {
    product: {
      selectionSet: `{ identity }`,
      resolve: async (root, args, context, info) => {
        // When the RowProduct is request as part of a product query, we expect the product to be
        // already resolved and available in the context
        if (responsePathAsArray(info.path)[0] === 'products') return null

        console.log('RowProduct', root.identity, responsePathAsArray(info.path))

        const result = await context.m2.Query.products({
          root,
          info,
          context,
          selectionSet: (subtree) => ({
            kind: Kind.SELECTION_SET,
            selections: [
              {
                kind: Kind.FIELD,
                name: { kind: Kind.NAME, value: 'items' },
                selectionSet: {
                  kind: Kind.SELECTION_SET,
                  selections: [
                    { kind: Kind.FIELD, name: { kind: Kind.NAME, value: 'url_key' } },
                    ...subtree.selections,
                  ],
                },
              },
            ],
          }),
          key: root.identity,
          argsFromKeys: (keys) => ({ filter: { url_key: { in: keys } } }),
          valuesFromResults: (results, keys) =>
            keys.map((key) => results?.items?.find((r) => r?.url_key === key) ?? null),
        })

        return (result ?? null) as ResolversTypes['ProductInterface'] | null
      },
    },
  },

  RowCategory: {
    category: {
      selectionSet: `{ categoryUrl }`,
      resolve: async (root, args, context, info) => {
        if (responsePathAsArray(info.path)[0] === 'products') return null
        console.log('RowCategory', root.categoryUrl, responsePathAsArray(info.path))

        const result = await context.m2.Query.categories({
          root,
          info,
          context,
          key: root.categoryUrl,
          selectionSet: (subtree) => ({
            kind: Kind.SELECTION_SET,
            selections: [
              {
                kind: Kind.FIELD,
                name: { kind: Kind.NAME, value: 'items' },
                selectionSet: {
                  kind: Kind.SELECTION_SET,
                  selections: [
                    { kind: Kind.FIELD, name: { kind: Kind.NAME, value: 'url_path' } },
                    ...subtree.selections,
                  ],
                },
              },
            ],
          }),
          argsFromKeys: (keys) => ({ filters: { url_path: { in: keys } } }),
          valuesFromResults: (results, keys) =>
            results?.items?.find((r) => r?.url_path === keys[0]) ?? null,
        })
        return (result ?? null) as ResolversTypes['CategoryTree'] | null
      },
    },
  },
}
