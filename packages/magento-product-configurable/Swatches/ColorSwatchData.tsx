import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { ColorSwatchDataFragment } from './ColorSwatchData.gql'
import { SwatchDataProps } from './types'

type ColorSwatchDataProps = ColorSwatchDataFragment &
  SwatchDataProps & {
    sx?: SxProps<Theme>
  }

type OwnerState = Pick<SwatchDataProps, 'size'>
const name = 'ColorSwatchData' as const
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
        sx={(theme) => ({
          margin: '0 auto',
          height: theme.responsiveTemplate`${[22, 30]}px`,
          width: theme.responsiveTemplate`${[22, 30]}px`,
          borderRadius: '50%',
          '&.sizeSmall': {
            height: theme.responsiveTemplate`${[8, 12]}px`,
            width: theme.responsiveTemplate`${[8, 12]}px`,
            marginTop: theme.responsiveTemplate`${[2, 4]}px`,
          },
        })}
      />
      {size !== 'small' && (
        <Box component='span' className={classes.label}>
          {store_label}
        </Box>
      )}
    </Box>
  )
}
