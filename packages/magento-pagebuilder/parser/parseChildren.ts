import { JSDOM } from 'jsdom'
import type { ContentTypeConfigChildren } from '../types'
import { isHTMLElement } from '../utils'
import { convertToInlineStyles, createContentTypeObject, walk } from './parser'

const jsdom = new JSDOM().window

export function parseChildren(node: HTMLElement) {
  const content: ContentTypeConfigChildren = [...node.childNodes].map((childNode) => {
    if (isHTMLElement(childNode)) {
      if (childNode.classList.contains('block-static-block')) {
        const stageContentType = createContentTypeObject('root-container')
        convertToInlineStyles(childNode)

        walk(childNode, stageContentType, (rootEl) =>
          jsdom.window.document.createTreeWalker(
            rootEl,
            // eslint-disable-next-line no-bitwise
            jsdom.window.NodeFilter.SHOW_ELEMENT | jsdom.window.NodeFilter.SHOW_TEXT,
          ),
        )
        return stageContentType
      }
    }

    if (childNode.nodeName === '#text' && childNode.textContent) {
      const { body } = new JSDOM(`<!DOCTYPE html>${childNode.textContent}`).window.document

      // Delete all script tags
      body.querySelectorAll('script').forEach((script) => script.remove())

      return body.innerHTML
    }

    return null
  })

  return content
}
