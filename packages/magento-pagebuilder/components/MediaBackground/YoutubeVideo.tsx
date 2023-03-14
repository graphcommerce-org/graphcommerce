import { styled, SxProps, Theme } from '@mui/material/styles'
import { VideoBackgroundProps } from './getVideoBackgroundProps'

type YoutubeVideoProps = {
  youtubeId: string
  sx?: SxProps<Theme>
} & Pick<VideoBackgroundProps, 'videoLoop' | 'videoLazyLoading'>

const YoutubeIframe = styled('iframe')({})

export function YoutubeVideo(props: YoutubeVideoProps) {
  const { youtubeId, videoLoop, videoLazyLoading, sx = [] } = props

  const youtubeUrl = new URL(`https://www.youtube.com/embed`)
  const { searchParams } = youtubeUrl
  searchParams.set('controls', '0')
  searchParams.set('autoplay', '1')
  searchParams.set('mute', '1')
  searchParams.set('iv_load_policy', '3')
  searchParams.set('playsinline', '1')
  searchParams.set('modestbranding', '1')
  searchParams.set('loop', videoLoop ? '1' : '0')
  searchParams.set('playlist', youtubeId)
  searchParams.set('color', 'white')

  return (
    <YoutubeIframe
      allow='autoplay'
      frameBorder='0'
      allowFullScreen
      loading={videoLazyLoading ? 'lazy' : undefined}
      src={youtubeUrl.toString()}
      sx={sx}
    />
  )
}
