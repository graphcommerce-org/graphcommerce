import type { VideoBackgroundProps } from './getVideoBackgroundProps'

export function extractVideoBackgroundProps<P extends VideoBackgroundProps>(
  props: P,
): [VideoBackgroundProps, Omit<P, keyof VideoBackgroundProps>] {
  const {
    videoSrc,
    videoFallbackSrc,
    videoLazyLoading,
    videoLoop,
    videoOverlayColor,
    videoPlayOnlyVisible,
    ...remaining
  } = props
  return [
    {
      videoSrc,
      videoFallbackSrc,
      videoLazyLoading,
      videoLoop,
      videoOverlayColor,
      videoPlayOnlyVisible,
    },
    remaining,
  ]
}
