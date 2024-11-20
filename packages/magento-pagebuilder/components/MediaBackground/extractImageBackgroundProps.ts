import { stripEmpty } from '../../utils'
import type { ImageBackgroundProps } from './getImageBackgroundProps'

export function extractImageBackgroundProps<P extends ImageBackgroundProps>(
  props: P,
): [Partial<ImageBackgroundProps>, Omit<P, keyof ImageBackgroundProps>] {
  const {
    mobileImage,
    desktopImage,
    backgroundSize,
    backgroundRepeat,
    backgroundAttachment,
    backgroundPosition,
    ...remaining
  } = props
  return [
    stripEmpty({
      mobileImage,
      desktopImage,
      backgroundSize,
      backgroundRepeat,
      backgroundAttachment,
      backgroundPosition,
    }),
    remaining,
  ]
}
