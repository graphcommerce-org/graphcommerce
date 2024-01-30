import { SxProps, Theme } from '@mui/material'
import { ImageBackground } from './ImageBackground'
import { VideoBackground } from './VideoBackground'
import { MediaBackgroundProps, isVideoBackgroundProps } from './getMediaBackgroundProps'

type MediaBackgroundComponentProps = MediaBackgroundProps & {
  sx?: SxProps<Theme>
}

export function MediaBackground(props: MediaBackgroundComponentProps) {
  const { sx } = props
  return isVideoBackgroundProps(props) ? (
    <VideoBackground {...props} sx={sx} />
  ) : (
    <ImageBackground {...props} sx={sx} />
  )
}
