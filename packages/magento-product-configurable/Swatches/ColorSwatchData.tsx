import { responsiveVal, extendableComponent } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { ColorSwatchDataFragment } from './ColorSwatchData.gql'
import type { SwatchDataProps } from './types'

type ColorSwatchDataProps = ColorSwatchDataFragment &
  SwatchDataProps & {
    sx?: SxProps<Theme>
  }

type OwnerState = Pick<SwatchDataProps, 'size'>
const name = 'ColorSwatchData'
const parts = ['root', 'color', 'label'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function ColorSwatchData(props: ColorSwatchDataProps) {
  const { value, store_label, size, sx } = props
  const classes = withState({ size })

  return (
    <Box className={classes.root} sx={sx}>
      <Box
        className={classes.color}
        style={{ backgroundColor: value ?? undefined }}
        sx={[
          {
            margin: '0 auto',
            height: responsiveVal(22, 30),
            width: responsiveVal(22, 30),
            borderRadius: '50%',
            '&.sizeSmall': {
              height: responsiveVal(8, 12),
              width: responsiveVal(8, 12),
              marginTop: responsiveVal(2, 4),
            },
          },
        ]}
      />
      {size !== 'small' && (
        <Box component='span' className={classes.label}>
          {store_label}
        </Box>
      )}
    </Box>
  )
}
