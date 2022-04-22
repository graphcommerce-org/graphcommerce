import React from 'react'
import { HTMLContent } from '../../parser/parseChildrenHtml'
import { ContentTypeFactory } from '../../factory'

export type RenderChildrenProps = {
  content: HTMLContent
}

export function RenderChildren({ content }: RenderChildrenProps) {
  return (
    <>
      {content.map((contentItem, itemIdx) => {
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

        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={itemIdx}>
            {contentItem.children.map((child, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className='ContentType-html-children' key={i}>
                <ContentTypeFactory data={child} />
              </div>
            ))}
          </React.Fragment>
        )
      })}
    </>
  )
}
