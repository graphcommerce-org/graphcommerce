import { SxProps, Theme } from '@mui/material/styles'
import { ImageBackground } from './ImageBackground'
import { VideoBackground } from './VideoBackground'
import { MediaBackgroundProps } from './getMediaBackgroundProps'

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
