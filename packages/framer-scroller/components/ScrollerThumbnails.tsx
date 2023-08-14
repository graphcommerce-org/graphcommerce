import { ImageProps } from '@graphcommerce/image'
import { ButtonProps, SxProps, Theme } from '@mui/material'
import { ScrollerThumbnail } from './ScrollerThumbnail'
import { ThumbnailContainer } from './ThumbnailContainer'

export type ThumbnailsProps = {
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>
  sx?: SxProps<Theme>
  images: Pick<ImageProps, 'src' | 'height' | 'width'>[]
}

const componentName = 'ScrollerThumbnails'

export function ScrollerThumbnails(props: ThumbnailsProps) {
  const { images, sx = [], ...buttonProps } = props
  return (
    <ThumbnailContainer sx={sx}>
      {images.map((item, i) => (
        <ScrollerThumbnail
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}-image`}
          idx={i}
          image={item}
          {...buttonProps}
        />
      ))}
    </ThumbnailContainer>
  )
}

ScrollerThumbnails.displayName = componentName
