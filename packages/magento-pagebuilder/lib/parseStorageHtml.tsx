/* eslint-disable no-bitwise */
/* eslint-disable no-continue */
// import { getContentTypeConfig } from './config'

import { getContentTypeConfig } from './config'
import { isHTMLElement } from './utils'

const pbStyleAttribute = 'data-pb-style'
const bodyId = 'html-body'

export const createContentTypeObject = (type: string, node?: HTMLElement): ContentTypeObject => ({
  contentType: type,
  appearance: node ? node.getAttribute('data-appearance') : null,
  children: [],
})

export type ContentTypeObject = {
  contentType: string
  appearance: string | null
  children: ContentTypeObject[]
}

/** Walk over tree nodes extracting each content types configuration */
export const walk = (rootEl: Node, contentTypeStructureObj) => {
  const tree = document.createTreeWalker(rootEl, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT)

  let currentNode = tree.nextNode()

  while (currentNode) {
    if (!isHTMLElement(currentNode)) {
      currentNode = tree.nextNode()
      continue
    }

    const contentType = currentNode.getAttribute('data-content-type')

    if (!contentType) {
      currentNode = tree.nextNode()
      continue
    }

    const props = createContentTypeObject(contentType, currentNode)
    const contentTypeConfig = getContentTypeConfig(contentType)

    if (contentTypeConfig && typeof contentTypeConfig.configAggregator === 'function') {
      try {
        Object.assign(props, contentTypeConfig.configAggregator(currentNode, props))
      } catch (e) {
        console.error(`Failed to aggregate config for content type ${contentType}.`, e)
      }
    } else {
      console.warn(
        `Page Builder ${contentType} content type is not supported, this content will not be rendered.`,
      )
    }

    contentTypeStructureObj.children.push(props)
    walk(currentNode, props)
    currentNode = tree.nextSibling()
  }

  return contentTypeStructureObj
}

/** Convert styles block to inline styles. */
export const convertToInlineStyles = (document: HTMLElement | Document) => {
  const styleBlocks = document.getElementsByTagName('style')
  const styles: Record<string, CSSStyleDeclaration[]> = {}
  const mediaStyles: Record<string, unknown> = {}

  ;[...styleBlocks].forEach((styleBlock) => {
    const cssRules = Array.from(styleBlock.sheet?.cssRules ?? [])

    cssRules.forEach((rule) => {
      if (rule instanceof CSSStyleRule) {
        const selectors = rule.selectorText.split(',').map((selector) => selector.trim())
        selectors.forEach((selector) => {
          if (!styles[selector]) styles[selector] = []
          styles[selector].push(rule.style)
        })
      } else if (rule instanceof CSSMediaRule) {
        Array.from(rule.media).forEach((media) => {
          const mediaStyle = Array.from(rule.cssRules).map((cssRule) => ({
            selectors: cssRule.selectorText.split(',').map((selector) => selector.trim()),
            css: cssRule.style.cssText,
          }))
          mediaStyles[media] = mediaStyle
        })
      }
    })
  })

  Object.keys(mediaStyles).map((media, i) => {
    mediaStyles[media].forEach((style) => {
      style.selectors.forEach((selector) => {
        const element = document.querySelector(selector)
        if (element) {
          element.setAttribute(`data-media-${i}`, media)
          const savedStyles = element.getAttribute(`data-media-style-${i}`)
          // avoids overwriting previously saved styles
          element.setAttribute(
            `data-media-style-${i}`,
            `${savedStyles ? `${savedStyles} ` : ''}${style.css}`,
          )
        }
      })
    })
  })

  Object.keys(styles).forEach((selector) => {
    const element = document.querySelector(selector)
    if (!element) {
      return
    }

    styles[selector].forEach((style) => {
      element.setAttribute('style', element.style.cssText + style.cssText)
    })
    element.removeAttribute(pbStyleAttribute)
  })
}

const parseStorageHtml = (htmlStr: string) => {
  const container = new DOMParser().parseFromString(htmlStr, 'text/html')

  const stageContentType = createContentTypeObject('root-container')

  container.body.id = bodyId
  convertToInlineStyles(container)

  return walk(container.body, stageContentType)
}

export default parseStorageHtml
