import type { PluginProps } from '@graphcommerce/next-config'
import type { SidebarGalleryProps } from '@graphcommerce/next-ui/FramerScroller/SidebarGallery'
import { useCallback } from 'react'
import { ScrollerThumbnails } from '../components/ScrollerThumbnails'

export const component = 'SidebarGallery'
export const exported = '@graphcommerce/next-ui'
export const ifEnv = 'GALLERY_THUMBNAILS'

function GalleryThumbnailNavigation(props: PluginProps<SidebarGalleryProps>) {
  const { Prev, ...rest } = props
  const navigation = useCallback(() => <ScrollerThumbnails images={rest.images} />, [rest.images])
  return <Prev {...rest} GalleryNavigation={navigation} />
}
export const Plugin = GalleryThumbnailNavigation
