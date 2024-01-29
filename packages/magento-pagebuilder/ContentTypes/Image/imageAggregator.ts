import {
  getBorder,
  getCssClasses,
  getIsHidden,
  getMargin,
  getPadding,
  getTextAlign,
  getMediaQuery,
  isHTMLElement,
  BorderProps,
  getAdvanced,
} from '../../utils'
import { ImageContentType, ImageProps } from './types'

const getImageData = (imageNode: HTMLImageElement) => {
  let imageDimension = null
  try {
    imageDimension = JSON.parse(imageNode.getAttribute('data-image-dimensions') ?? '')
  } catch (e) {
    // Do nothing
  }
  return {
    src: imageNode.getAttribute('src'),
    dimensions: imageDimension,
  }
}

export const imageAggregator: ImageContentType['configAggregator'] = (node) => {
  const link = node.querySelector('a')
  const figCaption = node.querySelector('figcaption')
  const desktop = node.querySelector<HTMLImageElement>('img[data-element=desktop_image]')
  const mobile = node.querySelector<HTMLImageElement>('img[data-element=mobile_image]')

  const getImageProps = () => {
    const image = desktop
    let imageProps: Partial<ImageProps> = {
      desktopImage: null,
      mobileImage: null,
      altText: null,
      title: null,
    }

    if (image) {
      const imageData = getImageData(image)
      if (image.getAttribute('data-element') === 'desktop_image') {
        imageProps.desktopImage = imageData
        const image2 = mobile
        if (
          image2 &&
          image2.getAttribute('data-element') === 'mobile_image' &&
          image2.getAttribute('src') !== imageData.src
        ) {
          imageProps.mobileImage = getImageData(image2)
        }
      } else {
        // If there is no desktop image
        imageProps.mobileImage = imageData
      }
      imageProps.altText = image.getAttribute('alt')
      imageProps.title = image.getAttribute('title')
      imageProps = {
        ...imageProps,
        ...getBorder(image),
      }
    }

    return imageProps as Pick<ImageProps, 'desktopImage' | 'mobileImage' | 'altText' | 'title'> &
      BorderProps
  }

  return {
    ...getImageProps(),
    openInNewTab: link?.getAttribute('target') === '_blank',
    ...getAdvanced(node),
    link: link?.getAttribute('href') ?? null,
    linkType: link?.getAttribute('data-link-type') ?? null,
  }
}
