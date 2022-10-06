import { Box, CircularProgress, Fab as FabBase, FabProps as FabPropsBase } from '@mui/material'
import { IconSvg, IconSvgProps } from '../IconSvg'
import { useFabSize } from '../Theme/MuiFab'

export type FabProps = Omit<FabPropsBase<'button'>, 'variant' | 'children'> & {
  loading?: boolean
  icon: IconSvgProps['src']
}

/** Adds loading functionality to the Fab component. */
export function Fab(props: FabProps) {
  const { size = 'responsive', disabled, loading, sx = [], icon, ...fabProps } = props

  const fabSize = useFabSize(size)

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
          sx={{ display: 'flex', placeContent: 'center', gridArea: '1/1' }}
          size={fabSize}
        />
      )}
    </FabBase>
  )
}
