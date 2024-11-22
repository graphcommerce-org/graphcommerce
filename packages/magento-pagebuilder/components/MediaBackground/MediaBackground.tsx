import type { SxProps, Theme } from '@mui/material'
import { ImageBackground } from './ImageBackground'
import { VideoBackground } from './VideoBackground'
import type { MediaBackgroundProps } from './getMediaBackgroundProps'

type MediaBackgroundComponentProps = MediaBackgroundProps & {
  sx?: SxProps<Theme>
}

export function MediaBackground(props: MediaBackgroundComponentProps) {
  const { backgroundType, sx } = props

  return backgroundType === 'image' ? (
    <ImageBackground {...props} sx={sx} />
  ) : (
    <VideoBackground {...props} sx={sx} />
  )
}
