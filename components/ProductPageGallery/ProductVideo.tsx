import React from 'react'

export default function ProductVideo(props: GQLProductVideoFragment) {
  const { video_content } = props

  if (!video_content?.video_url) return null

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video src={video_content.video_url} />
}
