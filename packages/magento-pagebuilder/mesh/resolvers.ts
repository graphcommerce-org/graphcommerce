/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Resolvers } from '@graphcommerce/graphql-mesh'
import { detectPageBuilder } from '../parser/detectPageBuilder'
import { parser } from '../parser/parser'

function nullIfPagebuilder(html: string | null | undefined): string | null {
  if (!html) return null
  const pagebuilder = detectPageBuilder(html)
  if (pagebuilder) return null
  return html
}

export const resolvers: Resolvers = {
  CmsPage: {
    pagebuilder: ({ content }) => parser(content),
    content: ({ content }) => nullIfPagebuilder(content),
  },
  CmsBlock: {
    pagebuilder: ({ content }) => parser(content),
    content: ({ content }) => nullIfPagebuilder(content),
  },
  CategoryTree: {
    pagebuilder: ({ description }) => parser(description),
    description: ({ description }) => nullIfPagebuilder(description),
  },
  ComplexTextValue: {
    pagebuilder: ({ html }) => parser(html),
    html: ({ html }) => nullIfPagebuilder(html) ?? '',
  },
}

export default { resolvers }
