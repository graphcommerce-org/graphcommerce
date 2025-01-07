import type { CircularProgressProps, FabProps as FabPropsBase } from '@mui/material'
import { Box, CircularProgress, Fab as FabBase } from '@mui/material'
import type { IconSvgProps } from '../IconSvg'
import { IconSvg } from '../IconSvg'
import { useFabSize } from '../Theme/MuiFab'
import { sxx } from '../utils/sxx'

export type FabProps = Omit<FabPropsBase<'button'>, 'variant' | 'children'> & {
  loading?: boolean
  icon: IconSvgProps['src']
  slotProps?: {
    icon?: Omit<IconSvgProps, 'src'>
    circularProgress?: Omit<CircularProgressProps, 'size'>
  }
}

/** Adds loading functionality to the Fab component. */
export function Fab(props: FabProps) {
  const {
    size = 'responsive',
    disabled,
    loading,
    sx = [],
    icon,
    color = 'default',
    slotProps,
    ...fabProps
  } = props

  const fabSize = useFabSize(size)

  return (
    <FabBase
      type='submit'
      color={color}
      size={size}
      {...fabProps}
      disabled={disabled}
      sx={[{ display: 'grid' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box sx={{ display: 'flex', placeContent: 'center', gridArea: '1/1' }}>
        <IconSvg src={icon} size='medium' {...slotProps?.icon} />
      </Box>
      {loading && (
        <CircularProgress
          size={fabSize}
          color={color !== 'primary' ? 'primary' : 'inherit'}
          {...slotProps?.circularProgress}
          sx={sxx(
            { display: 'flex', placeContent: 'center', gridArea: '1/1' },
            slotProps?.circularProgress?.sx,
          )}
        />
      )}
    </FabBase>
  )
}
