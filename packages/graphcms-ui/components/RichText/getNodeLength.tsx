import { isElementNode, isTextNode } from './RichText'
import { ElementOrTextNode } from './types'

export function getNodeLength(node: ElementOrTextNode): number {
  if (isElementNode(node))
    return node.children.map(getNodeLength).reduce<number>((prev, curr) => prev + curr, 0)

  if (isTextNode(node)) return node.text.length

  return 0
}
