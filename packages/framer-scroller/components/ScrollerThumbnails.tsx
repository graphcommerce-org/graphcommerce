import { ImageProps } from '@graphcommerce/image'
import { ButtonProps, SxProps, Theme } from '@mui/material'
import { m } from 'framer-motion'
import { ScrollerThumbnail } from './ScrollerThumbnail'
import { ThumbnailContainer } from './ThumbnailContainer'

export type ThumbnailsProps = {
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>
  sx?: SxProps<Theme>
  images: Pick<ImageProps, 'src' | 'height' | 'width'>[]
}

const componentName = 'ScrollerThumbnails'

export const ScrollerThumbnails = m((props: ThumbnailsProps) => {
  const { images, sx = [] } = props

  return (
    <ThumbnailContainer sx={sx}>
      {(items) =>
        items.map((item, i) => (
          <ScrollerThumbnail
            // eslint-disable-next-line react/no-array-index-key
            key={`${i}-image`}
            {...item}
            idx={i}
            image={images[i]}
          />
        ))
      }
    </ThumbnailContainer>
  )
})

ScrollerThumbnails.displayName = componentName
