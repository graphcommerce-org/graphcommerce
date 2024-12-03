import type { ContentTypeConfigWithString } from '../../types'
import { usePagebuilderContext } from './PagebuilderProvider'

export function PagebuilderRender(props: { contentItem: ContentTypeConfigWithString }) {
  const { getComponentByType } = usePagebuilderContext()
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

  const Render = getComponentByType(contentItem.contentType)

  const { children, ...rest } = contentItem
  return (
    <Render {...rest}>
      {children?.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PagebuilderRender contentItem={child} key={index} />
      ))}
    </Render>
  )
}
