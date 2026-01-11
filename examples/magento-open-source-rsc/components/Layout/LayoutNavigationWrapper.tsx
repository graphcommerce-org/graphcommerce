'use client'

import type { ReactNode } from 'react'
import { useLayoutData } from '../Providers'
import { LayoutNavigation } from './LayoutNavigation'

export type LayoutNavigationWrapperProps = {
  children: ReactNode
}

/**
 * Wrapper component that provides layout data from context to LayoutNavigation This bridges the
 * server-fetched layout data to the client-side LayoutNavigation
 */
export function LayoutNavigationWrapper({ children }: LayoutNavigationWrapperProps) {
  const layoutData = useLayoutData()

  return (
    <LayoutNavigation menu={layoutData?.menu} cmsBlocks={layoutData?.cmsBlocks}>
      {children}
    </LayoutNavigation>
  )
}
