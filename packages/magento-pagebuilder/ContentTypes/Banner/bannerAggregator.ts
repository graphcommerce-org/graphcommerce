import { getButtonLinkProps } from '../../components/ButtonLink/getButtonLinkProps'
import { getMediaBackgroundProps } from '../../components/MediaBackground/getMediaBackgroundProps'
import {
  getMargin,
  getBorder,
  getPadding,
  getTextAlign,
  getCssClasses,
  getMediaQuery,
  stripEmpty,
} from '../../utils'
import type { BannerContentType, ShowButton, ShowOverlay } from './types'

export const bannerAggregator: BannerContentType['configAggregator'] = (node, props) => {
  const wrapperElement = node.querySelector<HTMLElement>('[data-element="wrapper"]')
  const overlayElement = node.querySelector<HTMLElement>('[data-element="overlay"]')
  const contentElement = node.querySelector<HTMLElement>('[data-element="content"]')

  const minHeightPaddingElement = props.appearance === 'poster' ? overlayElement : wrapperElement
  if (!minHeightPaddingElement) throw new Error('Min height element not found')

  if (!wrapperElement) throw new Error('Banner wrapper element not found')

  const showOverlay = node.getAttribute('data-show-overlay') as ShowOverlay
  const showButton = node.getAttribute('data-show-button') as ShowButton

  const overlayColor =
    overlayElement && showOverlay !== 'never'
      ? overlayElement.getAttribute('data-overlay-color')
      : null

  return stripEmpty({
    backgroundColor: wrapperElement.style.backgroundColor,

    ...getMediaBackgroundProps(wrapperElement),

    content: contentElement?.innerHTML,
    showButton,
    ...getButtonLinkProps(node),

    showOverlay,
    overlayColor,

    ...getTextAlign(wrapperElement),
    ...getBorder(wrapperElement),

    ...getCssClasses(node),
    ...getMargin(node),
    ...getMediaQuery(node),

    minHeight: minHeightPaddingElement?.style.minHeight,
    ...getPadding(minHeightPaddingElement),
    ...getMediaQuery(minHeightPaddingElement),
  })
}
