import { getAdvanced } from '../../utils'
import type { VideoContentType } from './types'

export const videoAggregator: VideoContentType['configAggregator'] = (node: HTMLElement) => {
  const iframe = node.querySelector('iframe')
  const video = node.querySelector('video')
  const wrapper = node.querySelector('[data-element="wrapper"]')
  // const headerElements = node.querySelectorAll<HTMLDivElement>('ul[data-element=navigation] > *')

  return {
    url: (iframe && iframe.getAttribute('src')) || (video && video.getAttribute('src')) || null,
    autoplay: !!(video && video.getAttribute('autoplay') === 'true'),
    muted: !!(video && video.getAttribute('muted') === 'true'),
    maxWidth: node.childNodes[0].style.maxWidth || null,
    ...getAdvanced(node),
  }
}
