import React, { useEffect, useRef } from 'react'
import useConnectionType from './useConnectionType'

// @todo incomplete list
export type VideoMimeTypes = 'video/mp4' | 'image/webv'

export type VideoResponsiveProps = JSX.IntrinsicElements['video']

/**
 * Creates a standard video element but disables autoplay for 3g connections
 */
const VideoResponsive = ({ autoPlay, controls, ...videoProps }: VideoResponsiveProps) => {
  const connectionType = useConnectionType()
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (connectionType !== '4g') return
    if (!controls) ref.current?.removeAttribute('controls')
    ref.current?.play()
  }, [connectionType, controls])

  return <video ref={ref} muted playsInline controls loop {...videoProps} />
}

export default VideoResponsive
