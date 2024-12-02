import React from 'react'
import { getComponentByType } from '../../renderTypes'
import { PagebuilderProvider } from './PagebuilderProvider'
import { PagebuilderRender } from './PagebuilderRender'
import { isPagebuilderValue } from './isPagebuilderValue'

export type PagebuilderProps = {
  pagebuilder: unknown
  /** The children are only rendered when there is no pagebuilder content. */
  children: React.ReactNode
}

export function Pagebuilder(props: PagebuilderProps) {
  const { pagebuilder, children } = props

  if (isPagebuilderValue(pagebuilder)) {
    return (
      <PagebuilderProvider getComponentByType={getComponentByType}>
        <PagebuilderRender contentItem={pagebuilder} />
      </PagebuilderProvider>
    )
  }

  return <>{children}</>
}
