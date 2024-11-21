import type { SxProps, Theme } from '@mui/material'
import { Box, styled } from '@mui/material'
import { YoutubeVideo } from './YoutubeVideo'
import type { VideoBackgroundProps } from './getVideoBackgroundProps'

type VideoBackgroundComponentProps = VideoBackgroundProps & {
  sx?: SxProps<Theme>
}

const VideoBox = styled('video')({})
const IFrameBox = styled('iframe')({})

const youtubeRegExp = new RegExp(
  '^(?:https?://|//)?(?:www\\.|m\\.)?' +
    '(?:youtu\\.be/|youtube\\.com/(?:embed/|v/|watch\\?v=|watch\\?.+&v=))([\\w-]{11})(?![\\w-])',
)
const vimeoRegExp = new RegExp(
  'https?://(?:www\\.|player\\.)?vimeo.com/(?:channels/' +
    '(?:\\w+/)?|groups/([^/]*)/videos/|album/(\\d+)/video/|video/|)(\\d+)(?:$|/|\\?)',
)

export function VideoBackground(props: VideoBackgroundComponentProps) {
  const {
    sx = [],
    videoSrc,
    videoLoop,
    videoPlayOnlyVisible,
    videoFallbackSrc,
    videoLazyLoading,
    videoOverlayColor,
  } = props

  if (!videoSrc) return null

  const [, youtubeId] = youtubeRegExp.exec(videoSrc) ?? []
  const [, vimeoId] = vimeoRegExp.exec(videoSrc) ?? []

  return (
    <Box
      sx={[
        {
          overflow: 'hidden',
          paddingTop: `${100 / (16 / 9)}%`,
          position: 'relative',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {youtubeId && (
        <YoutubeVideo
          {...props}
          youtubeId={youtubeId}
          sx={{ position: 'absolute', height: '100%', left: 0, top: 0, width: '100%' }}
        />
      )}

      {vimeoId && (
        <IFrameBox
          title={videoSrc}
          frameBorder='0'
          allowFullScreen
          loading='lazy'
          src={videoSrc}
          sx={{ position: 'absolute', height: '100%', left: 0, top: 0, width: '100%' }}
        />
      )}

      {!vimeoId && !youtubeId && (
        <VideoBox src={videoSrc} autoPlay playsInline muted controls sx={sx} />
      )}
    </Box>
  )
}
