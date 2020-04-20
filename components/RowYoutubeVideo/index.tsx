import React from 'react'

const RowYoutubeVideo: React.FC<GQLRowYoutubeVideoFragment> = ({ videoId, title }) => {
  return (
    <iframe
      title={title}
      width='1920'
      height='1080'
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  )
}

export default RowYoutubeVideo
