import React from 'react'

export default function ProductVideo(props: GQLProductImageFragment) {
  const { url } = props

  if (!url) return null

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={url} />
}
