import { Box, type SxProps, type Theme } from '@mui/material'
import * as React from 'react'
import { extendableComponent } from '../Styles/extendableComponent'
import { sxx } from '../utils/sxx'

export type YoutubePosterResolution =
  | 'default'
  | 'mqdefault'
  | 'hqdefault'
  | 'sddefault'
  | 'maxresdefault'

export type YoutubeEmbedProps = {
  id: string
  title: string
  announce?: string
  adNetwork?: boolean
  aspectHeight?: number
  aspectWidth?: number
  noCookie?: boolean
  cookie?: boolean
  params?: string
  playlist?: boolean
  playlistCoverId?: string
  poster?: YoutubePosterResolution
  webp?: boolean
  muted?: boolean
  thumbnail?: string
  rel?: 'preload' | 'prefetch'
  onIframeAdded?: () => void
  sx?: SxProps<Theme>
  ref?: React.Ref<HTMLIFrameElement>
}

const componentName = 'YoutubeEmbed' as const
const parts = ['root', 'poster', 'playButton', 'iframe'] as const
const { classes } = extendableComponent(componentName, parts)

export function YoutubeEmbed(props: YoutubeEmbedProps) {
  const {
    id,
    title,
    announce = 'Watch',
    adNetwork = false,
    aspectHeight = 9,
    aspectWidth = 16,
    noCookie = true,
    cookie = false,
    params = '',
    playlist = false,
    playlistCoverId,
    poster = 'hqdefault',
    webp = false,
    muted = false,
    thumbnail,
    rel = 'preload',
    onIframeAdded,
    sx,
    ref,
  } = props

  const [preconnected, setPreconnected] = React.useState(false)
  const [iframeReady, setIframeReady] = React.useState(false)

  const videoId = encodeURIComponent(id)
  const videoPlaylistCoverId =
    typeof playlistCoverId === 'string' ? encodeURIComponent(playlistCoverId) : null

  const format = webp ? 'webp' : 'jpg'
  const vi = webp ? 'vi_webp' : 'vi'
  const posterUrl =
    thumbnail ||
    (!playlist
      ? `https://i.ytimg.com/${vi}/${videoId}/${poster}.${format}`
      : `https://i.ytimg.com/${vi}/${videoPlaylistCoverId}/${poster}.${format}`)

  const ytUrl = cookie || !noCookie ? 'https://www.youtube.com' : 'https://www.youtube-nocookie.com'
  const paramsSuffix = params ? `&${params}` : ''
  const mutedSuffix = muted ? '&mute=1' : ''

  const iframeSrc = !playlist
    ? `${ytUrl}/embed/${videoId}?autoplay=1&state=1${mutedSuffix}${paramsSuffix}`
    : `${ytUrl}/embed/videoseries?autoplay=1${mutedSuffix}&list=${videoId}${paramsSuffix}`

  const warmConnections = () => {
    if (!preconnected) setPreconnected(true)
  }
  const addIframe = () => {
    if (!iframeReady) setIframeReady(true)
  }

  React.useEffect(() => {
    if (iframeReady) onIframeAdded?.()
  }, [iframeReady, onIframeAdded])

  return (
    <>
      <link rel={rel} href={posterUrl} as='image' />
      {preconnected && (
        <>
          <link rel='preconnect' href={ytUrl} />
          <link rel='preconnect' href='https://www.google.com' />
          {adNetwork && (
            <>
              <link rel='preconnect' href='https://static.doubleclick.net' />
              <link rel='preconnect' href='https://googleads.g.doubleclick.net' />
            </>
          )}
        </>
      )}
      <Box
        className={classes.root}
        onPointerOver={warmConnections}
        onClick={addIframe}
        data-title={title}
        sx={sxx(
          {
            position: 'relative',
            display: 'block',
            contain: 'content',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            cursor: 'pointer',
            maxWidth: '100%',
            aspectRatio: `${aspectWidth} / ${aspectHeight}`,
            backgroundImage: `url(${posterUrl})`,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              height: '60px',
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.247) 0%, rgba(0,0,0,0) 100%)',
              pointerEvents: 'none',
            },
          },
          sx,
        )}
      >
        {!iframeReady && (
          <Box
            component='button'
            type='button'
            className={classes.playButton}
            aria-label={`${announce} ${title}`}
            sx={{
              border: 0,
              padding: 0,
              cursor: 'pointer',
              width: '68px',
              height: '48px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: '-34px',
              marginTop: '-24px',
              borderRadius: '14%',
              transition: 'background-color 100ms cubic-bezier(0, 0, 0.2, 1)',
              backgroundColor: '#212121',
              opacity: 0.8,
              '&:hover, &:focus': { backgroundColor: 'red', opacity: 1 },
              '&::before': {
                content: '""',
                borderStyle: 'solid',
                borderWidth: '11px 0 11px 19px',
                borderColor: 'transparent transparent transparent #fff',
                display: 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate3d(-50%, -50%, 0)',
              },
            }}
          />
        )}
        {iframeReady && (
          <Box
            component='iframe'
            ref={ref}
            className={classes.iframe}
            title={title}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            src={iframeSrc}
            sx={{
              border: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        )}
      </Box>
    </>
  )
}
