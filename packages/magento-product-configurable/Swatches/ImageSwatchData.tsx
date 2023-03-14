import { Image } from '@graphcommerce/image'
import { responsiveVal, extendableComponent } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
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
            height: responsiveVal(40, 80),
            width: responsiveVal(40, 80),
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
