import type { ImageBackgroundProps } from './getImageBackgroundProps'
import { getImageBackgroundProps } from './getImageBackgroundProps'
import type { VideoBackgroundProps } from './getVideoBackgroundProps'
import { getVideoBackgroundProps } from './getVideoBackgroundProps'

export type MediaBackgroundProps =
  | (VideoBackgroundProps & { backgroundType: 'video' })
  | (ImageBackgroundProps & { backgroundType: 'image' })

export function getMediaBackgroundProps(node: HTMLElement): MediaBackgroundProps {
  const backgroundType = node.getAttribute('data-background-type') === 'image' ? 'image' : 'video'

  return backgroundType === 'image'
    ? { ...getImageBackgroundProps(node), backgroundType }
    : { ...getVideoBackgroundProps(node), backgroundType }
}
