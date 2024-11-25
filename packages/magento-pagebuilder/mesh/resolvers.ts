import type { MeshContext, Resolvers } from '@graphcommerce/graphql-mesh'
import { detectPageBuilder } from '../parser/detectPageBuilder'
import { parser } from '../parser/parser'

function warnNoContent(
  content: string | null | undefined,
  requiredField: string,
  type: string,
  { logger }: MeshContext,
): content is string | null {
  if (!content) {
    logger.warn(
      `Can not process pagebuilder field, please also query the ${requiredField} on type ${type}`,
    )
    return false
  }
  return true
}

function nullIfPagebuilder(html: string | null | undefined): string | null {
  if (!html) return null
  const pagebuilder = detectPageBuilder(html)
  if (pagebuilder) return null
  return html
}

export const resolvers: Resolvers = {
  CmsPage: {
    pagebuilder: {
      selectionSet: '{ content }',
      resolve: ({ content }, _, ctx) => {
        warnNoContent(content, 'content', 'CmsPage', ctx)
        return parser(content)
      },
    },
    content: ({ content }) => nullIfPagebuilder(content),
  },
  CmsBlock: {
    pagebuilder: {
      selectionSet: '{ content }',
      resolve: ({ content }, _, ctx) => {
        warnNoContent(content, 'content', 'CmsBlock', ctx)
        return parser(content)
      },
    },
    content: ({ content }) => nullIfPagebuilder(content),
  },
  CategoryTree: {
    pagebuilder: {
      selectionSet: '{ description }',
      resolve: ({ description }, _, ctx) => {
        warnNoContent(description, 'description', 'CategoryTree', ctx)
        return parser(description)
      },
    },
    description: ({ description }) => nullIfPagebuilder(description),
  },
  ComplexTextValue: {
    pagebuilder: {
      selectionSet: '{ html }',
      resolve: ({ html }, _, ctx) => {
        warnNoContent(html, 'html', 'ComplexTextValue', ctx)
        return parser(html)
      },
    },
    html: ({ html }) => nullIfPagebuilder(html) ?? '',
  },
}

export default { resolvers }
