import React from 'react'
import { UseGalleryZoomProps, useGalleryZoom } from '../hooks/useGalleryZoom'

type GalleryZoomProps = UseGalleryZoomProps & {
  children?: (props: ReturnType<typeof useGalleryZoom>) => React.ReactNode
}

export function GalleryZoom(props: GalleryZoomProps) {
  const { children, ...rest } = props
  const galleryZoom = useGalleryZoom(rest)
  return <>{children?.(galleryZoom)}</>
}
