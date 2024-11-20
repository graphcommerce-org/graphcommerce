import type { ContentTypeConfig } from '../../types'

export function isPagebuilderValue(pagebuilder: unknown): pagebuilder is ContentTypeConfig {
  return (
    typeof (pagebuilder as ContentTypeConfig)?.contentType === 'string' &&
    Array.isArray((pagebuilder as ContentTypeConfig).children)
  )
}
