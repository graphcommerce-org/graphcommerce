/* eslint-disable import/no-extraneous-dependencies */
import {
  GcMetaTag,
  MetaRobots,
  type Resolvers,
  delegateToSchemaSdk,
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

export const resolvers: Resolvers = {
  GcPage: {
    rows: {
      // Rewrite the rows field to the content field.
      // Strip out product and category as they will be resolved by Magento.
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
      resolve: (root) => root.rows ?? root.content,
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
  Query: {
    gcPage: {
      /**
       * We are using delegateToSchema, because we've encountered limitations with
       * `context.hygraph.Query.pages({...})`:
       *
       * - The above resolver are not called as we are directly resolving the
       *   source/subgraph/directly and these resolvers are on the final schema / supergraph.
       * - Somehwere inside the resulting types inside pages we've got a few @resolveTo directives
       *   defined and those are not called either.
       */
      resolve: async (_, args, context, info) => {
        /**
         * This is a wrapper around delegateToSchema, does some inferring of the return type and the arguments.
         *
         * Might it be an idea to have a @delegateTo directive that can be used in the schema?
         */
        const result = await delegateToSchemaSdk({
          context,
          info,
          sourceName: 'hygraph',
          sourceTypeName: 'Query',
          sourceFieldName: 'pages',
          sourceArgs: { where: { url: denormalizeUrl(args.input.href) } },
        })

        return result?.[0]
      },
    },
  },
}
