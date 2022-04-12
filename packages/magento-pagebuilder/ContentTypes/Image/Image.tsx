import { Box } from '@mui/material'
import { extractAdvancedProps, extractBorderProps } from '../../utils'
import { ImageContentType } from './types'

/**
 * Page Builder Image component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Image: ImageContentType['component'] = (props) => {
  const [border, remaining] = extractBorderProps(props)
  const [cssProps, cssClasses, isHidden, additional] = extractAdvancedProps(remaining)

  const classes = {}
  const {
    altText = '',
    appearance,
    contentType,
    desktopImage,
    mobileImage,
    title,
    children,
  } = additional

  const figureStyles = cssProps
  const imageStyles = border

  // Don't render anything if there is no image to be rendered
  if ((!desktopImage?.src && !mobileImage?.src) || isHidden) return null

  const isSame = desktopImage?.src === mobileImage?.src

  return (
    <Box component='figure' sx={figureStyles}>
      {desktopImage?.src && (
        <Box
          component='img'
          src={desktopImage?.src}
          //   alt={altText}
          title={title || undefined}
          sx={{
            ...border,
            objectFit: 'contain',
            display: {
              xs: isSame ? 'inline-block' : 'none',
              md: 'inline-block',
            },
          }}
        />
      )}
      {mobileImage?.src && !isSame && (
        <Box
          component='img'
          src={mobileImage?.src}
          //   alt={altText}
          title={title || undefined}
          sx={{
            ...border,
            objectFit: 'contain',
            display: {
              xs: 'inline-block',
              md: isSame ? 'inline-block' : 'none',
            },
          }}
        />
      )}
    </Box>
  )
}
