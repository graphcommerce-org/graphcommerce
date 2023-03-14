import { Image } from '@graphcommerce/image'
import { extendableComponent } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
import { OrderCardItemImageFragment } from '../../hooks/OrderCardItemImage.gql'

export type OrderCardItemImageProps = Omit<OrderCardItemImageFragment, 'uid'> & {
  sx?: SxProps<Theme>
}

const componentName = 'OrderCardItemImage' as const
const parts = ['image', 'placeholder'] as const
const { classes } = extendableComponent(componentName, parts)

export function OrderCardItemImage(props: OrderCardItemImageProps) {
  const { thumbnail, sx = [] } = props

  const sxx: SxProps<Theme> = [{ width: 88, height: 88 }, ...(Array.isArray(sx) ? sx : [sx])]

  return (
    <>
      {thumbnail ? (
        <Image
          alt={thumbnail?.label ?? ''}
          width={88}
          height={88}
          src={thumbnail?.url ?? ''}
          className={classes.image}
          sx={sxx}
        />
      ) : (
        <Box className={classes.placeholder} sx={sxx} />
      )}
    </>
  )
}
