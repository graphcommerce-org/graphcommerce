import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps } from '../../utils'

export type TabsConfig = ContentTypeConfig<'html'>

export type TabNavigationAlignment = 'left' | 'right' | 'center'

export type TabsProps = AdvancedProps & {
  defaultIndex: number
  minHeight?: string
  tabNavigationAlignment: TabNavigationAlignment
  headers: string[]
}

export type TabsContentType = ContentType<TabsConfig, TabsProps>
