import React from 'react'

// @todo incomplete list
export type VideoMimeTypes = 'video/mp4' | 'image/webv'

export type VideoResponsiveProps = JSX.IntrinsicElements['video']

/** Supposed to be an optimization for 3g, but that seems to be impossible. */
const VideoResponsive = ({ ...videoProps }: VideoResponsiveProps) => (
  <video muted playsInline loop {...videoProps} />
)

export default VideoResponsive
