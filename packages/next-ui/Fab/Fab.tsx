import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Fab as FabBase,
  FabProps as FabPropsBase,
} from '@mui/material'
import { IconSvg, IconSvgProps } from '../IconSvg'
import { useFabSize } from '../Theme/MuiFab'

export type FabProps = Omit<FabPropsBase<'button'>, 'variant' | 'children'> & {
  loading?: boolean
  icon: IconSvgProps['src']
  circularProgress?: Omit<CircularProgressProps, 'size'>
}

/** Adds loading functionality to the Fab component. */
export function Fab(props: FabProps) {
  const {
    size = 'responsive',
    disabled,
    loading,
    sx = [],
    icon,
    circularProgress,
    color = 'default',
    ...fabProps
  } = props

  const fabSize = useFabSize(size)

  const circSx = circularProgress?.sx ?? []

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
        <IconSvg src={icon} size='medium' />
      </Box>
      {loading && (
        <CircularProgress
          size={fabSize}
          color={color !== 'primary' ? 'primary' : 'inherit'}
          {...circularProgress}
          sx={[
            { display: 'flex', placeContent: 'center', gridArea: '1/1' },
            ...(Array.isArray(circSx) ? circSx : [circSx]),
          ]}
        />
      )}
    </FabBase>
  )
}
