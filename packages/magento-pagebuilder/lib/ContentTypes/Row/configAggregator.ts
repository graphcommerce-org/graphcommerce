import {
  getAdvanced,
  getBackgroundImages,
  getVerticalAlignment,
  getMediaQueries,
  isHTMLElement,
} from '../../utils'
import { RowContentType } from './types'

export const configAggregator: RowContentType['configAggregator'] = (node, props) => {
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
    ...getBackgroundImages(dataNode),
    enableParallax: dataNode.getAttribute('data-enable-parallax') === '1',
    parallaxSpeed: Number(dataNode.getAttribute('data-parallax-speed')),
    backgroundType: dataNode.getAttribute('data-background-type'),
    videoSrc: dataNode.getAttribute('data-video-src'),
    videoFallbackSrc: dataNode.getAttribute('data-video-fallback-src'),
    videoLoop: dataNode.getAttribute('data-video-loop') === 'true',
    videoPlayOnlyVisible: dataNode.getAttribute('data-video-play-only-visible') === 'true',
    videoLazyLoading: dataNode.getAttribute('data-video-lazy-load') === 'true',
    videoOverlayColor:
      props.appearance === 'full-width' || props.appearance === 'full-bleed'
        ? childNode && childNode.getAttribute('data-video-overlay-color')
        : childNode && childNode.getAttribute('data-video-overlay-color'),
    ...getAdvanced(dataNode),
    ...getMediaQueries(dataNode),
  }
}
