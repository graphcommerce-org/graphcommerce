import { ContentTypeConfig } from '../../types'
import { usePagebuilderContext } from './PagebuilderProvider'

export type RenderChildrenProps = ContentTypeConfig

export function PagebuilderRender({ children, contentType }: RenderChildrenProps) {
  const { getRenderType } = usePagebuilderContext()
  return (
    <div data-content-type={contentType}>
      {children?.map((contentItem, itemIdx) => {
        if (!contentItem) return null
        if (typeof contentItem === 'string') {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={itemIdx}
              className='ContentType-html'
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: contentItem }}
              // onClick={clickHandler}
              // onKeyDown={clickHandler}
              role='presentation'
            />
          )
        }

        const Render = getRenderType(contentItem.contentType)
        if (!Render) return null

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Render key={itemIdx} {...contentItem}>
            <PagebuilderRender {...contentItem} />
          </Render>
        )
      })}
    </div>
  )
}
