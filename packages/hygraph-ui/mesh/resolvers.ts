/* eslint-disable import/no-extraneous-dependencies */
import { GcMetaTag, MetaRobots, type Resolvers } from '@graphcommerce/graphql-mesh'
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
}
