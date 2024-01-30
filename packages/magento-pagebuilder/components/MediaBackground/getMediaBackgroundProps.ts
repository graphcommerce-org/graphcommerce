import { ImageBackgroundProps, getImageBackgroundProps } from './getImageBackgroundProps'
import { getVideoBackgroundProps, VideoBackgroundProps } from './getVideoBackgroundProps'

export type MediaBackgroundProps =
  | (VideoBackgroundProps & { backgroundType: 'video' })
  | (ImageBackgroundProps & { backgroundType: 'image' })

export function isVideoBackgroundProps(
  props: MediaBackgroundProps,
): props is VideoBackgroundProps & { backgroundType: 'video' } {
  return props.backgroundType === 'video'
}

export function getMediaBackgroundProps(node: HTMLElement): MediaBackgroundProps {
  const backgroundType = node.getAttribute('data-background-type') === 'image' ? 'image' : 'video'

  return backgroundType === 'image'
    ? { ...getImageBackgroundProps(node), backgroundType }
    : { ...getVideoBackgroundProps(node), backgroundType }
}
