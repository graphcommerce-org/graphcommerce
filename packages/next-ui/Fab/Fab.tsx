import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Fab as FabBase,
  FabProps as FabPropsBase,
} from '@mui/material'
import PageLink from 'next/link'
import { IconSvg, IconSvgProps } from '../IconSvg'
import { useFabSize } from '../Theme/MuiFab'

export type FabProps = Omit<FabPropsBase<'button'>, 'variant' | 'LinkComponent'> & {
  loading?: boolean
  icon?: IconSvgProps['src']
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
    children,
    circularProgress,
    ...fabProps
  } = props

  const fabSize = useFabSize(size)

  const circSx = circularProgress?.sx ?? []

  return (
    <FabBase
      type='submit'
      LinkComponent={PageLink}
      color='primary'
      size={size}
      {...fabProps}
      disabled={disabled}
      sx={[{ display: 'grid' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box sx={{ display: 'flex', placeContent: 'center', gridArea: '1/1' }}>
        {icon ? <IconSvg src={icon} size='medium' /> : children}
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
