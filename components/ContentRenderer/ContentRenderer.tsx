import { GQLGetPageQuery } from '../../generated/graphql'

type TypeNames = GQLGetPageQuery['pages'][0]['content'][0]['__typename']
export type Renderers = { [T in TypeNames]?: React.ComponentType<any> }
export const renderers: Renderers = {}

export const ContentRenderer: React.FC<{
  content: GQLGetPageQuery['pages'][0]['content']
}> = ({ content }) => {
  return (
    <>
      {content.map(item => {
        const Component = renderers[item.__typename]
        return Component ? (
          <Component {...item} />
        ) : (
          <div>Content block with type {item.__typename} not implemented/loading</div>
        )
      })}
    </>
  )
}
