import Box from '@mui/material/Box'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import FabBase, { FabProps as FabPropsBase } from '@mui/material/Fab'
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
    ...fabProps
  } = props

  const fabSize = useFabSize(size)

  const circSx = circularProgress?.sx ?? []

  return (
    <FabBase
      type='submit'
      color='primary'
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
