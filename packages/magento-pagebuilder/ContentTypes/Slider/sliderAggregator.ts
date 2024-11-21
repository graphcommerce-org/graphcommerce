import { getAdvanced, getMediaQuery } from '../../utils'
import type { SliderContentType } from './types'

export const sliderAggregator: SliderContentType['configAggregator'] = (node) => ({
  minHeight: node.style.minHeight,
  autoplay: node.getAttribute('data-autoplay') === 'true',
  fade: node.getAttribute('data-fade') === 'true',
  infinite: node.getAttribute('data-infinite-loop') === 'true',
  showArrows: node.getAttribute('data-show-arrows') === 'true',
  showDots: node.getAttribute('data-show-dots') === 'true',
  autoplaySpeed: node.getAttribute('data-autoplay-speed')
    ? Number(node.getAttribute('data-autoplay-speed'))
    : undefined,
  ...getAdvanced(node),
  ...getMediaQuery(node),
})
