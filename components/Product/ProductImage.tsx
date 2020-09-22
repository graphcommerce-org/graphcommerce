import PictureResponsiveSharp from 'components/PictureResponsiveSharp'
import { m as motion } from 'framer-motion'
import React from 'react'

export default function ProductImage(props: GQLProductImageFragment & { layoutId?: string }) {
  const { url, layoutId } = props

  if (!url) return null

  // eslint-disable-next-line jsx-a11y/alt-text

  return <PictureResponsiveSharp src={url} type='image/jpeg' width={500} height={500} alt='hoi' />
}
