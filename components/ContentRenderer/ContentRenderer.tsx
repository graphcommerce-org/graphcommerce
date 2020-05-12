/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export type ContentRendererTypes = GQLContentRendererFragment['content'][0]['__typename']
export type Renderers = {
  [T in ContentRendererTypes]?: React.ComponentType<any>
}

let defaultRenderers: Renderers = {}
export const setRenderers = (newRenderers: Renderers): void => {
  defaultRenderers = { ...defaultRenderers, ...newRenderers }
}

export type ContentRowProps = {
  index: number
}

const ContentRenderer: React.FC<GQLContentRendererFragment & { renderers?: Renderers }> = (
  props,
) => {
  const { content, renderers = {} } = props
  return (
    <>
      {content.map((item, index) => {
        const Component = renderers[item.__typename] ?? defaultRenderers[item.__typename]
        return Component ? (
          <Component key={item.id} {...item} index={index} />
        ) : (
          <div key={item.id}>Content block with type {item.__typename} not implemented/loading</div>
        )
      })}
    </>
  )
}

export default ContentRenderer
