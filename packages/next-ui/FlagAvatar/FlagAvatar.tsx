import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import { useIntlDisplayNames } from '../Intl'
import { sxx } from '../utils/sxx'

export type FlagAvatarProps = { country: string; size: string } & Omit<BoxProps<'img'>, 'src'>

export function FlagAvatar(props: FlagAvatarProps) {
  const { country, size, sx, ...avatarProps } = props

  const displayName = useIntlDisplayNames({ type: 'region' })

  return (
    <Box
      component='img'
      {...avatarProps}
      src={`https://flagcdn.com/${country}.svg`}
      alt={displayName.of(country)}
      sx={sxx(
        {
          width: size,
          borderRadius: '2px',
          height: size,
        },
        sx,
      )}
    />
  )
}
