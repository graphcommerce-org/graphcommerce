import { ContentTypeConfigWithString } from '../../types'
import { usePagebuilderContext } from './PagebuilderProvider'

export function PagebuilderRender(props: { contentItem: ContentTypeConfigWithString }) {
  const { getComponentByType: getRenderType } = usePagebuilderContext()
  const { contentItem } = props

  if (!contentItem) return null

  if (typeof contentItem === 'string') {
    return (
      <div
        // eslint-disable-next-line react/no-array-index-key
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

  return (
    <Render {...contentItem}>
      {contentItem.children?.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PagebuilderRender contentItem={child} key={index} />
      ))}
    </Render>
  )
}
