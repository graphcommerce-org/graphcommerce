import { normalizePathTrailingSlash } from 'next/dist/client/normalize-trailing-slash'
import { ImageConfigComplete, imageConfigDefault } from 'next/dist/shared/lib/image-config'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { ImageLoaderProps } from 'next/image'

export type DefaultImageLoaderProps = ImageLoaderProps & { root: string }

type ImageConfig = ImageConfigComplete & { allSizes: number[] }

export type ImageLoaderPropsWithConfig = ImageLoaderProps & {
  config: Readonly<ImageConfig>
}

export const {
  deviceSizes: configDeviceSizes,
  // imageSizes: configImageSizes,
  // loader: configLoader,
  // path: configPath,
  // domains: configDomains,
  // eslint-disable-next-line no-underscore-dangle
} = (process.env.__NEXT_IMAGE_OPTS as unknown as ImageConfigComplete) || imageConfigDefault

function normalizeSrc(src: string): string {
  return src[0] === '/' ? src.slice(1) : src
}

export function imgixLoader({ config, src, width, quality }: ImageLoaderPropsWithConfig): string {
  // Demo: https://static.imgix.net/daisy.png?auto=format&fit=max&w=300
  const url = new URL(`${config.path}${normalizeSrc(src)}`)
  const params = url.searchParams

  // auto params can be combined with comma separation, or reiteration
  params.set('auto', params.getAll('auto').join(',') || 'format')
  params.set('fit', params.get('fit') || 'max')
  params.set('w', params.get('w') || width.toString())

  if (quality) {
    params.set('q', quality.toString())
  }

  return url.href
}

export function akamaiLoader({ config, src, width }: ImageLoaderPropsWithConfig): string {
  return `${config.path}${normalizeSrc(src)}?imwidth=${width}`
}

export function cloudinaryLoader({
  config,
  src,
  width,
  quality,
}: ImageLoaderPropsWithConfig): string {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  const paramsString = `${params.join(',')}/`
  return `${config.path}${paramsString}${normalizeSrc(src)}`
}

export function defaultLoader({ config, src, width, quality }: ImageLoaderPropsWithConfig): string {
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

    if (!src.startsWith('/') && (config.domains || config.remotePatterns)) {
      let parsedSrc: URL
      try {
        parsedSrc = new URL(src)
      } catch (err) {
        console.error(err)
        throw new Error(
          `Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`,
        )
      }

      if (
        process.env.NODE_ENV !== 'test' &&
        // micromatch isn't compatible with edge runtime
        process.env.NEXT_RUNTIME !== 'edge'
      ) {
        // We use dynamic require because this should only error in development
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        import('next/dist/shared/lib/match-remote-pattern').then(({ hasMatch }) => {
          if (!hasMatch(config.domains, config.remotePatterns, parsedSrc)) {
            throw new Error(
              `Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` +
                `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`,
            )
          }
        })
      }
    }
  }

  if (src.endsWith('.svg') && !config.dangerouslyAllowSVG) {
    // Special case to make svg serve as-is to avoid proxying
    // through the built-in Image Optimization API.
    return src
  }

  return `${normalizePathTrailingSlash(config.path ?? '')}?url=${encodeURIComponent(
    src,
  )}&w=${width}&q=${quality || 75}`
}

export function customLoader({ src }: ImageLoaderProps): string {
  throw new Error(
    `Image with src "${src}" is missing "loader" prop.` +
      `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`,
  )
}
