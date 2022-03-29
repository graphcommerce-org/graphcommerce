import { ImageConfigComplete, imageConfigDefault } from 'next/dist/shared/lib/image-config'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { ImageLoaderProps } from 'next/image'

export type DefaultImageLoaderProps = ImageLoaderProps & { root: string }

export const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains,
  // eslint-disable-next-line no-underscore-dangle
} = (process.env.__NEXT_IMAGE_OPTS as unknown as ImageConfigComplete) || imageConfigDefault

function normalizeSrc(src: string): string {
  return src[0] === '/' ? src.slice(1) : src
}

export function imgixLoader({ root, src, width, quality }: DefaultImageLoaderProps): string {
  // Demo: https://static.imgix.net/daisy.png?format=auto&fit=max&w=300
  const params = ['auto=format', 'fit=max', `w=${width}`]
  let paramsString = ''
  if (quality) {
    params.push(`q=${quality}`)
  }

  if (params.length) {
    paramsString = `?${params.join('&')}`
  }
  return `${root}${normalizeSrc(src)}${paramsString}`
}

export function akamaiLoader({ root, src, width }: DefaultImageLoaderProps): string {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`
}

export function cloudinaryLoader({ root, src, width, quality }: DefaultImageLoaderProps): string {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  const paramsString = `${params.join(',')}/`
  return `${root}${paramsString}${normalizeSrc(src)}`
}

export function defaultLoader({ root, src, width, quality }: DefaultImageLoaderProps): string {
  if (process.env.NODE_ENV !== 'production') {
    const missingValues: string[] = []

    // these should always be provided but make sure they are
    if (!src) missingValues.push('src')
    if (!width) missingValues.push('width')

    if (missingValues.length > 0) {
      throw new Error(
        `Next Image Optimization requires ${missingValues.join(
          ', ',
        )} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify(
          { src, width, quality },
        )}`,
      )
    }

    if (src.startsWith('//')) {
      throw new Error(
        `Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`,
      )
    }

    if (!src.startsWith('/') && configDomains) {
      let parsedSrc: URL
      try {
        parsedSrc = new URL(src)
      } catch (err) {
        console.error(err)
        throw new Error(
          `Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`,
        )
      }

      if (!configDomains.includes(parsedSrc.hostname)) {
        throw new Error(
          `Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` +
            `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`,
        )
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
}
