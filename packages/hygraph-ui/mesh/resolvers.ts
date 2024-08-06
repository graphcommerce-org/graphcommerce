/* eslint-disable import/no-extraneous-dependencies */
import {
  GcMetaTag,
  MeshContext,
  MetaRobots,
  PageContent,
  ProductInterface,
  ResolversTypes,
  RowProduct,
  type Resolvers,
} from '@graphcommerce/graphql-mesh'
import { Kind } from 'graphql'

const normalizeUrl = (href: string) => {
  const cleanedhref = href.replaceAll(/^\/|\/$/g, '')
  return `/${cleanedhref === 'page/home' ? '' : cleanedhref}`
}

const denormalizeUrl = (href: string) => {
  const cleanedhref = href.replaceAll(/^\/|\/$/g, '')
  return cleanedhref === '' ? 'page/home' : cleanedhref
}

type GCPageResolver = NonNullable<Resolvers['SimpleProduct']>['gcPage']

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

const gcPageProductResolver: GCPageResolver = {
  selectionSet: `{url_key}`,
  resolve: async (root, args, context, info) => {
    setProduct(context, root.url_key!, root)
    const page = (
      await context.hygraph.Query.pages({
        context,
        info,
        root,
        key: root.url_key,
        argsFromKeys: (keys) => ({
          where: { url_in: ['product/global', ...keys.map((key) => `p/${key}`)] },
        }),
        valuesFromResults: (results, keys) =>
          keys.map((key) => [
            results.find((r) => r.url === `p/${key}`) ??
              results.find((r) => r.url === 'product/global') ??
              null,
          ]),
      })
    )?.[0]

    // Since the RowProduct is a child of the current product, we replace the identity with the current product's URL key.
    if (page?.content)
      page.content = page.content.map((row) =>
        isRowProduct(row) ? { ...row, identity: root.url_key ?? row.identity } : row,
      )

    return page
  },
}

export const resolvers: Resolvers = {
  // Resolve the query `gcPage` to a page with the given URL
  Query: {
    gcPage: {
      resolve: async (root, args, context, info) =>
        context.hygraph.Query.pages({
          root,
          info,
          context,
          args: { where: { url: denormalizeUrl(args.input.href) } },
        }).then((r) => r[0]),
    },
  },

  GcPage: {
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
      resolve: (root) => root.content,
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

  SimpleProduct: { gcPage: gcPageProductResolver },
  ConfigurableProduct: { gcPage: gcPageProductResolver },
  BundleProduct: { gcPage: gcPageProductResolver },
  VirtualProduct: { gcPage: gcPageProductResolver },
  DownloadableProduct: { gcPage: gcPageProductResolver },
  GroupedProduct: { gcPage: gcPageProductResolver },

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore GiftCardProduct is only available in Commerce
  GiftCardProduct: { gcPage: gcPageProductResolver },

  RowProduct: {
    product: {
      selectionSet: `{ identity }`,
      resolve: async (root, args, context, info) => {
        const storedProduct = getProduct(context, root.identity)
        if (storedProduct) return storedProduct as ResolversTypes['ProductInterface']

        const result = await context.m2.Query.products({
          root,
          info,
          context,
          key: root.identity,
          argsFromKeys: (keys) => ({
            filter: { url_key: { in: keys } },
          }),
          valuesFromResults: (results, keys) =>
            keys.map((key) => results?.items?.find((r) => r?.url_key === key) ?? null),
        })

        const product = (result ?? null) as ResolversTypes['ProductInterface']

        return product
      },
    },
  },

  RowCategory: {
    category: {
      selectionSet: `{ categoryUrl }`,
      resolve: async (root, args, context, info) => {
        const result = await context.m2.Query.categories({
          root,
          info,
          context,
          args: { filters: { url_path: { eq: root.categoryUrl } }, pageSize: 1 },
        })
        const category = result?.items?.[0] ?? null
        return category as ResolversTypes['CategoryTree']
      },
    },
  },
}
