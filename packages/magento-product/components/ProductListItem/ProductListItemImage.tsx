import type { ImageProps } from '@graphcommerce/image'
import { Image } from '@graphcommerce/image'
import { sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { BoxProps } from '@mui/material'
import { Box, Skeleton, styled } from '@mui/material'

const StyledImage = styled(Image)({})

function PlaceHolderContainer(props: BoxProps) {
  return (
    <Box
      sx={{
        typography: 'caption',
        display: 'flex',
        textAlign: 'center',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'background.default',
        userSelect: 'none',
      }}
      {...props}
    />
  )
}

export type ProductListItemImageProps = {
  aspectRatio?: [number, number]
  classes?: {
    image?: string
    placeholder?: string
  }
}

export function ProductListItemImageSkeleton(props: ProductListItemImageProps) {
  const { aspectRatio = [4, 3], classes } = props
  return (
    <PlaceHolderContainer className={`${classes?.placeholder} ${classes?.image}`}>
      <Skeleton
        animation='wave'
        sx={{
          width: '100%',
          aspectRatio: `${aspectRatio[0] / aspectRatio[1]}`,
          transform: 'none',
        }}
      />
    </PlaceHolderContainer>
  )
}

export type ImageOrPlaceholderProps = ProductListItemImageProps &
  Omit<ImageProps, 'alt' | 'src'> & {
    alt?: ImageProps['alt'] | null
    src?: ImageProps['src'] | null
  }

export function ProductListItemImage(props: ImageOrPlaceholderProps) {
  const { aspectRatio = [4, 3], classes, src, alt, sx = [], ...image } = props

  if (src) {
    return (
      <StyledImage
        layout='fill'
        width={1}
        height={1}
        src={src}
        alt={alt ?? ''}
        {...image}
        className={classes?.image}
        sx={sxx(
          {
            objectFit: 'contain',
            aspectRatio: `${aspectRatio[0] / aspectRatio[1]}`,
            display: 'block',
          },
          sx,
        )}
      />
    )
  }

  return (
    <PlaceHolderContainer className={`${classes?.placeholder} ${classes?.image}`}>
      <Box
        sx={sxx(
          {
            width: '100%',
            height: '100%',
            aspectRatio: `${aspectRatio[0] / aspectRatio[1]}`,
          },
          sx,
        )}
      >
        <Trans>No Image</Trans>
      </Box>
    </PlaceHolderContainer>
  )
}
