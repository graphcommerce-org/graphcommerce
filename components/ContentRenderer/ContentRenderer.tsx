/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type TypeNames = GQLContentRendererFragment['content'][0]['__typename']
export type Renderers = {
  [T in TypeNames]?: React.ComponentType<any>
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

/**
 * Make sure you also register this method in defaultRenderer.tsx
 */
export type CRGetStaticProps<P, R> = (props: P) => Promise<R>

type LoaderComponent<P = any> = Promise<{
  getStaticProps: CRGetStaticProps<P, any>
}>

export type StaticData = { [T in TypeNames]?: () => LoaderComponent }

let staticProps: StaticData = {}
export const setStaticProps = (newStaticProps: StaticData): void => {
  staticProps = { ...staticProps, ...newStaticProps }
}

export const getStaticProps = async (
  content: GQLContentRendererFragment['content'],
): Promise<GQLContentRendererFragment['content']> => {
  const augmented = await Promise.all(
    content.map(async (item) => {
      const loader = staticProps[item.__typename]
      if (!loader) return item

      const { getStaticProps: get } = await loader()
      return { ...item, ...(await get(item)) }
    }),
  )

  return augmented
}
