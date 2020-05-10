import React, { useEffect, useState } from 'react'
import useConnectionType from './useConnectionType'

// @todo incomplete list
export type ImageMimeTypes = 'video/mp4' | 'image/webv'

export type VideoResponsiveProps = JSX.IntrinsicElements['video']

/**
 * Creates a simple video element but disables autoplay for 3g connections
 */
const VideoResponsive = ({ autoPlay, ...videoProps }: VideoResponsiveProps) => {
  const connectionType = useConnectionType()
  const [canAutoPlay, setAutoPlay] = useState(false)

  useEffect(() => {
    if (connectionType === '4g' && autoPlay) setAutoPlay(true)
  }, [connectionType, autoPlay])

  return (
    <video muted playsInline autoPlay={canAutoPlay} controls={!canAutoPlay} loop {...videoProps} />
  )
}

export default VideoResponsive
