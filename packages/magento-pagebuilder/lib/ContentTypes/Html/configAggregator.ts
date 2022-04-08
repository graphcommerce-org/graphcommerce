import {
  ContentTypeObject,
  convertToInlineStyles,
  createContentTypeObject,
  walk,
} from '../../parseStorageHtml'
import { getAdvanced } from '../../utils'
import { HTMLContent, HtmlContentType } from './types'

export const configAggregator: HtmlContentType['configAggregator'] = (node) => {
  const content: HTMLContent = [...node.childNodes].map((childNode) => {
    if (childNode instanceof HTMLElement) {
      if (childNode.classList.contains('block-static-block')) {
        const stageContentType = createContentTypeObject('root-container')
        convertToInlineStyles(childNode)
        walk(childNode, stageContentType)
        return stageContentType
      }
    }
    if (childNode.nodeName === '#text' && childNode.textContent) {
      const container = new DOMParser().parseFromString(childNode.textContent, 'text/html')

      // Delete all script tags
      container.body.querySelectorAll('script').forEach((script) => script.remove())

      return container.body.innerHTML
    }

    return null
  })

  return {
    content,
    ...getAdvanced(node),
  }
}
