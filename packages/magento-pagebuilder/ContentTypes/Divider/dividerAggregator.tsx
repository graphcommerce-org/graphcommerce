import { getAdvanced, isHTMLElement } from '../../utils'
import type { DividerContentType } from './types'

export const dividerAggregator: DividerContentType['configAggregator'] = (node) => {
  const childNode = node.firstChild && isHTMLElement(node.firstChild) ? node.firstChild : null
  if (!childNode) throw Error('Divider must have a child node')
  return {
    width: childNode.style.width,
    color: childNode.style.borderColor,
    thickness: childNode.style.borderWidth,
    ...getAdvanced(node),
  }
}
