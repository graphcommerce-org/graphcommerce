import { ScrollerThumbnails } from '@graphcommerce/framer-scroller'
import type { SidebarGalleryProps } from '@graphcommerce/next-ui/FramerScroller/SidebarGallery'
import type { PluginProps } from '@graphcommerce/next-config'
import { useCallback } from 'react'

export const component = 'SidebarGallery'
export const exported = '@graphcommerce/next-ui'
export const ifEnv = 'DEMO_MAGENTO_GRAPHCOMMERCE'

function DemoSidebarGallery(props: PluginProps<SidebarGalleryProps>) {
  const { Prev, ...rest } = props
  const navigation = useCallback(() => <ScrollerThumbnails images={rest.images} />, [rest.images])
  return <Prev {...rest} GalleryNavigation={navigation} />
}
export const Plugin = DemoSidebarGallery
