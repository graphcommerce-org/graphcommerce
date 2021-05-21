import React from 'react'
import { ProductVideoFragment } from './ProductVideo.gql'

export default function ProductVideo(props: ProductVideoFragment) {
  const { video_content } = props

  if (!video_content?.video_url) return null

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video itemScope itemType='https://schema.org/VideoObject' src={video_content.video_url} />
}
