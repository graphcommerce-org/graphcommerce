import { Image } from '@graphcommerce/image'
import { extendableComponent, ActionCard } from '@graphcommerce/next-ui'
import { SxProps, Theme } from '@mui/material'
import { ConfigurableOptionsActionCardProps, SwatchDataProps } from './types'

type ImageSwatchDataProps = ConfigurableOptionsActionCardProps &
  Pick<SwatchDataProps, 'size'> & { sx?: SxProps<Theme> }

type OwnerState = Pick<SwatchDataProps, 'size'>
const name = 'ColorSwatchData' as const
const parts = ['root', 'image', 'label'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function ImageSwatchData(props: ImageSwatchDataProps) {
  const { swatch_data, store_label, size, sx = [] } = props

  const classes = withState({ size })

  const image = swatch_data?.__typename === 'ImageSwatchData' && swatch_data.thumbnail && (
    <Image
      className={classes.image}
      src={swatch_data.thumbnail ?? ''}
      layout='fixed'
      width={size === 'small' ? 30 : 50}
      height={size === 'small' ? 30 : 50}
      alt={swatch_data.value ?? ''}
      sx={{
        marginTop: 1,
        borderRadius: '50%',
      }}
    />
  )

  return (
    <ActionCard key={swatch_data?.value} image={image} title={store_label} size={size} {...props} />
  )
}
