import { stripEmpty } from '../../utils'

export type ImageBackgroundProps = {
  mobileImage?: string | null
  desktopImage?: string | null
} & Pick<
  React.CSSProperties,
  'backgroundSize' | 'backgroundPosition' | 'backgroundAttachment' | 'backgroundRepeat'
>

/** Retrieve background images from a master format node */
export function getImageBackgroundProps(node: HTMLElement): ImageBackgroundProps {
  const images = node.getAttribute('data-background-images')
  const response = {
    desktopImage: null,
    mobileImage: null,
    backgroundSize: node.style.backgroundSize,
    backgroundPosition: node.style.backgroundPosition,
    backgroundAttachment: node.style.backgroundAttachment,
    backgroundRepeat: node.style.backgroundRepeat || 'repeat',
  }

  if (images) {
    const imagesStructure = JSON.parse(images.replace(/\\"/g, '"'))
    if (imagesStructure.desktop_image) {
      response.desktopImage = imagesStructure.desktop_image
    }
    if (imagesStructure.mobile_image) {
      response.mobileImage = imagesStructure.mobile_image
    }
  }

  return stripEmpty(response)
}
