import type { MotionImageAspectPropsAdditional } from '@graphcommerce/framer-scroller'
import { Fab, iconPlay, IconSvg, sxx, type FabProps } from '@graphcommerce/next-ui'
import { Avatar, Box, IconButton, styled, type SxProps, type Theme } from '@mui/material'
import { m, type MotionProps, type MotionStyle } from 'framer-motion'
import React, { useState } from 'react'
import type { ProductVideoFragment } from './ProductVideo.gql'

const youtubeRegExp = new RegExp(
  '^(?:https?://|//)?(?:www\\.|m\\.)?' +
    '(?:youtu\\.be/|(?:youtube\\.com/|youtube-nocookie\\.com/)(?:embed/|v/|watch\\?v=|watch\\?.+&v=))' +
    '([\\w-]{11})(?![\\w-])',
)
const vimeoRegExp = new RegExp(
  'https?://(?:www\\.|player\\.)?vimeo.com/(?:channels/' +
    '(?:\\w+/)?|groups/([^/]*)/videos/|album/(\\d+)/video/|video/|)(\\d+)(?:$|/|\\?)',
)

export function isHostedVideo(src: string): boolean {
  return vimeoRegExp.test(src) || youtubeRegExp.test(src)
}

const Iframe = m.create(styled('iframe')({}))
const Video = m.create(styled('video')({}))

type IframeProps = React.ComponentProps<typeof Iframe>
type VideoProps = React.ComponentProps<typeof Video>

export type ProductVideoProps = {
  video?: ProductVideoFragment
  autoplay?: boolean
  iframeProps?: IframeProps
  videoProps?: VideoProps
  sx?: SxProps<Theme>
  width?: number
  height?: number
} & MotionImageAspectPropsAdditional

export function PlayCircle(props: Omit<FabProps, 'icon'>) {
  return (
    <Fab
      // color='inherit'
      size='responsive'
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '& svg': { pl: '2px' },
      }}
      icon={iconPlay}
      {...props}
    />
  )
}

/**
 * The regular URL will be something like https://vimeo.com/1059670239 The resulting URL will be
 * something like https://player.vimeo.com/video/1059670239?autoplay=1&loop=1&muted=1
 *
 * https://developer.vimeo.com/player/sdk/embed
 */
function vimeoUrl(regularUrl: string, noCookie: boolean, muted: boolean = true) {
  const vimUrl = new URL(regularUrl)

  vimUrl.host = 'player.vimeo.com'
  vimUrl.pathname = `/video${vimUrl.pathname}`
  vimUrl.searchParams.set('autoplay', '1')
  vimUrl.searchParams.set('loop', '1')
  vimUrl.searchParams.set('muted', muted ? '1' : '0')

  return vimUrl.toString()
}

function youtubeUrl(regularUrl: string, noCookie: boolean = false, autoplay: boolean = true) {
  const videoId = regularUrl.split('v=')[1]
  if (!videoId) return null
  const ytUrl = noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com'
  let iframeSrc = `${ytUrl}/embed/${videoId}`
  iframeSrc = autoplay ? `${iframeSrc}?autoplay=1&mute=1&loop=1&disablekb=1` : iframeSrc
  return iframeSrc
}

function getEmbedUrl(regularUrl: string, noCookie: boolean = true, muted: boolean = true) {
  if (youtubeRegExp.test(regularUrl)) {
    return youtubeUrl(regularUrl, noCookie, muted)
  }
  if (vimeoRegExp.test(regularUrl)) {
    return vimeoUrl(regularUrl, noCookie, muted)
  }
  return null
}

export function ProductVideo(props: ProductVideoProps) {
  const { video, autoplay, iframeProps, videoProps, sx, style, layout, width, height } = props

  const [play, setPlay] = useState(autoplay)

  const videoContent = video?.video_content

  if (!videoContent?.video_url) return null

  const src = videoContent.video_url
  const title = videoContent.video_title || undefined

  const baseSx: SxProps<Theme> = (theme) => ({
    display: 'block',
    maxWidth: '99.6%',
    maxHeight: '100%',
    width: '100%',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    aspectRatio: width && height ? `${width} / ${height}` : '16 / 9',
    border: 'none',
  })

  const embedUrl = getEmbedUrl(src)

  return (
    <>
      {play &&
        (embedUrl ? (
          <Box
            sx={(theme) => ({
              width: '100%',
              height: '100%',
              background: theme.palette.background.image,
            })}
          >
            <Iframe
              title={title}
              frameBorder='none'
              allowFullScreen
              loading={autoplay ? 'eager' : 'lazy'}
              // src={autoplay ? `${src}?autoplay=1&mute=1&loop=1&controls=0&disablekb=1` : src}
              {...iframeProps}
              style={style}
              src={embedUrl}
              allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
              sx={sxx(baseSx, sx, iframeProps?.sx)}
            />
          </Box>
        ) : (
          <Video
            src={src}
            title={title}
            controls={false}
            autoPlay={Boolean(autoplay)}
            muted={Boolean(autoplay)}
            playsInline
            {...videoProps}
            style={style}
            sx={sxx(baseSx, sx, videoProps?.sx)}
          />
        ))}
      {!play && (
        <PlayCircle
          onClick={(e) => {
            e.preventDefault()
            setPlay(true)
          }}
        />
      )}
    </>
  )
}
