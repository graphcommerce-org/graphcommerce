import { IconSvg, iconInfo } from '@graphcommerce/next-ui'
import { Box, IconButton } from '@mui/material'
import { LightTooltip } from './LightTooltip'

export type DraftModeToolbarProps = Record<string, unknown>

export function DraftModeToolbar(props: DraftModeToolbarProps) {
  const {} = props
  return (
    <Box sx={{ display: 'flex', placeItems: 'center' }}>
      Preview Mode
      <LightTooltip title='You are currently viewing the website in Preview Mode (caches are disabled).'>
        <IconButton size='small'>
          <IconSvg src={iconInfo} />
        </IconButton>
      </LightTooltip>
    </Box>
  )
}
