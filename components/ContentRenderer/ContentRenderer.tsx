import React from 'react'

type TypeNames = GQLContentRendererFragment['content'][0]['__typename']
export type Renderers = { [T in TypeNames]?: React.ComponentType<any> }
export const renderers: Renderers = {}

const ContentRenderer: React.FC<GQLContentRendererFragment & { customRenderers?: Renderers }> = (
  props,
) => {
  const { content, customRenderers = {} } = props
  return (
    <>
      {content.map((item) => {
        const Component = customRenderers[item.__typename] ?? renderers[item.__typename]
        return Component ? (
          <Component key={item.id} {...item} />
        ) : (
          <div key={item.id}>Content block with type {item.__typename} not implemented/loading</div>
        )
      })}
    </>
  )
}

export default ContentRenderer
