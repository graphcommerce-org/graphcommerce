import { Image } from '@graphcommerce/image'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { ImageSwatchDataFragment } from './ImageSwatchData.gql'
import { SwatchDataProps } from './types'

type ImageSwatchDataProps = ImageSwatchDataFragment & SwatchDataProps & { sx?: SxProps<Theme> }

type OwnerState = Pick<SwatchDataProps, 'size'>
const name = 'ColorSwatchData' as const
const parts = ['root', 'image', 'label'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function ImageSwatchData(props: ImageSwatchDataProps) {
  const { value, thumbnail, store_label, size, sx = [] } = props

  const classes = withState({ size })

  return (
    <Box
      sx={[
        (theme) => ({
          '& .image': {
            height: theme.rv`${[40, 80]}px`,
            width: theme.rv`${[40, 80]}px`,
            border: `3px solid ${theme.palette.divider}`,
            boxSizing: 'border-box',
            borderRadius: '50%',
            objectFit: 'cover',
          },
          '&.small .image': {
            width: 20,
            height: 20,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          width={size === 'small' ? 20 : 40}
          height={size === 'small' ? 20 : 40}
          alt={value ?? ''}
          className={classes.image}
        />
      ) : (
        <div className={classes.image}>{store_label}</div>
      )}
    </Box>
  )
}
