import { getImageBackgroundProps } from '../../components/MediaBackground/getImageBackgroundProps'
import { getMediaBackgroundProps } from '../../components/MediaBackground/getMediaBackgroundProps'
import { getAdvanced, getMediaQuery, getVerticalAlignment, isHTMLElement } from '../../utils'
import type { RowContentType } from './types'

export const rowAggregator: RowContentType['configAggregator'] = (node, props) => {
  const childNode = node.firstChild && isHTMLElement(node.firstChild) ? node.firstChild : null

  // Determine which node holds the data for the appearance
  const dataNode = props.appearance === 'contained' ? childNode : node

  if (!dataNode) throw Error('datNode not found')

  const containsDynamicBlock = [...(dataNode?.childNodes ?? [])].some(
    (e) => isHTMLElement(e) && e.getAttribute('data-content-type') === 'dynamic_block',
  )

  return {
    minHeight: containsDynamicBlock ? undefined : dataNode?.style.minHeight,
    ...getVerticalAlignment(dataNode),
    backgroundColor: dataNode?.style.backgroundColor,
    ...getMediaBackgroundProps(dataNode),
    enableParallax: dataNode.getAttribute('data-enable-parallax') === '1',
    parallaxSpeed: Number(dataNode.getAttribute('data-parallax-speed')),
    backgroundType: dataNode.getAttribute('data-background-type'),

    ...getImageBackgroundProps(dataNode),
    ...getAdvanced(dataNode),
    ...getMediaQuery(dataNode),
  }
}
