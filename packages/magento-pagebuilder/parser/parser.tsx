/* eslint-disable no-continue */
// import { getContentTypeConfig } from './config'
import { JSDOM } from 'jsdom'
import type { ContentTypeKeys } from '../parserTypes'
import { getContentType } from '../parserTypes'
import type { ContentTypeConfig } from '../types'
// eslint-disable-next-line import/no-cycle
import { getIsHidden, isHTMLElement } from '../utils'
import { detectPageBuilder } from './detectPageBuilder'

const pbStyleAttribute = 'data-pb-style'
const bodyId = 'html-body'

export const createContentTypeObject = (type: string, node?: HTMLElement): ContentTypeConfig => ({
  contentType: type,
  appearance: node ? node.getAttribute('data-appearance') : null,
  children: [],
})

/** Walk over tree nodes extracting each content types configuration */
export const walk = (
  rootEl: Node,
  contentTypeStructureObj: ContentTypeConfig,
  treeWalkerCb: (node: Node) => TreeWalker,
) => {
  const tree = treeWalkerCb(rootEl)

  let currentNode = tree.nextNode()
  while (currentNode) {
    if (!isHTMLElement(currentNode)) {
      currentNode = tree.nextNode()
      continue
    }

    const contentType = currentNode.getAttribute('data-content-type') as ContentTypeKeys

    if (!contentType) {
      currentNode = tree.nextNode()
      continue
    }

    const props = createContentTypeObject(contentType, currentNode)
    const aggregator = getContentType(contentType)

    if (aggregator && typeof aggregator === 'function') {
      try {
        const result = { ...props, ...aggregator(currentNode, props) }

        if (!getIsHidden(currentNode)) contentTypeStructureObj.children.push(result)
      } catch (e) {
        console.error(`Failed to aggregate config for content type ${contentType}.`, e)
      }
    } else {
      console.warn(
        `Page Builder ${contentType} content type is not supported, this content will not be rendered.`,
      )
    }

    walk(currentNode, props, treeWalkerCb)
    currentNode = tree.nextSibling()
  }

  return contentTypeStructureObj
}

function isCssStyleRule(rule: CSSRule): rule is CSSStyleRule {
  return !!(rule as CSSStyleRule).style
}
function isCssMediaRule(rule: CSSRule): rule is CSSMediaRule {
  return !!(rule as CSSMediaRule).media
}

/** Convert styles block to inline styles. */
export const convertToInlineStyles = (document: HTMLElement | Document) => {
  const styleBlocks = document.getElementsByTagName('style')
  const styles: Record<string, CSSStyleDeclaration[]> = {}
  const mediaStyles: Record<string, { selectors: string[]; css: string }[]> = {}

  ;[...styleBlocks].forEach((styleBlock) => {
    const cssRules = Array.from(styleBlock.sheet?.cssRules ?? [])

    cssRules.forEach((rule) => {
      if (isCssStyleRule(rule)) {
        const selectors = rule.selectorText.split(',').map((selector) => selector.trim())
        selectors.forEach((selector) => {
          if (!styles[selector]) styles[selector] = []
          styles[selector].push(rule.style)
        })
      } else if (isCssMediaRule(rule)) {
        Array.from(rule.media).forEach((media) => {
          const mediaStyle = Array.from(rule.cssRules)
            .filter(isCssStyleRule)
            .map((cssRule) => ({
              selectors: cssRule.selectorText.split(',').map((selector) => selector.trim()),
              css: cssRule.style.cssText,
            }))
          mediaStyles[media] = mediaStyle
        })
      }
    })
  })

  Object.keys(mediaStyles).forEach((media, i) => {
    mediaStyles[media].forEach((style) => {
      style.selectors.forEach((selector) => {
        const element = document.querySelector(selector)

        if (element) {
          element.setAttribute(`data-media-${i}`, media)
          const savedStyles = element.getAttribute(`data-media-style-${i}`) ?? ''

          element.setAttribute(`data-media-style-${i}`, `${savedStyles} ${style.css}`)
        }
      })
    })
  })

  Object.keys(styles).forEach((selector) => {
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) return

    styles[selector].forEach((style) => {
      element.setAttribute('style', element.style.cssText + style.cssText)
    })
    element.removeAttribute(pbStyleAttribute)
  })
}

export const parser = (htmlStr: string | null | undefined) => {
  if (!detectPageBuilder(htmlStr)) return null

  const jsdom = new JSDOM(`<!DOCTYPE html>${htmlStr}`)

  // const { document } = jsdom.window
  const stageContentType = createContentTypeObject('root-container')

  const { document } = jsdom.window
  const { body } = jsdom.window.document

  body.id = bodyId
  convertToInlineStyles(jsdom.window.document)

  return walk(body, stageContentType, (rootEl) =>
    document.createTreeWalker(
      rootEl,
      // eslint-disable-next-line no-bitwise
      jsdom.window.NodeFilter.SHOW_ELEMENT | jsdom.window.NodeFilter.SHOW_TEXT,
    ),
  )
}
