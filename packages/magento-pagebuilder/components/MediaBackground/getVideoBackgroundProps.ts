import { stripEmpty } from '../../utils'

export type VideoBackgroundProps = {
  videoSrc?: string | null
  videoFallbackSrc?: string | null
  videoLoop: boolean
  videoPlayOnlyVisible: boolean
  videoLazyLoading: boolean
  videoOverlayColor?: string | null
}

export function getVideoBackgroundProps(node: HTMLElement): VideoBackgroundProps {
  const videoOverlayElement = node.querySelector<HTMLElement>('[data-element="video_overlay"]')
  return stripEmpty({
    videoSrc: node.getAttribute('data-video-src'),
    videoFallbackSrc: node.getAttribute('data-video-fallback-src'),
    videoLoop: node.getAttribute('data-video-loop') === 'true',
    videoPlayOnlyVisible: node.getAttribute('data-video-play-only-visible') === 'true',
    videoLazyLoading: node.getAttribute('data-video-lazy-load') === 'true',
    videoOverlayColor: videoOverlayElement?.getAttribute('data-video-overlay-color'),
  })
}
