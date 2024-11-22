import type { ProductVideoFragment } from './ProductVideo.gql'

export function ProductVideo(props: ProductVideoFragment) {
  const { video_content } = props

  if (!video_content?.video_url) return null

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video src={video_content.video_url} />
}
