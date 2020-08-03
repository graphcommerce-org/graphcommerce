import { m as motion } from 'framer-motion'
import { GQLProductImageFragment } from 'generated/graphql'
import React from 'react'

export default function ProductImage(props: GQLProductImageFragment & { layoutId?: string }) {
  const { url, layoutId } = props

  if (!url) return null

  // eslint-disable-next-line jsx-a11y/alt-text
  return <motion.img src={url} layoutId={layoutId ?? ''} style={{ maxWidth: 500 }} />
}
