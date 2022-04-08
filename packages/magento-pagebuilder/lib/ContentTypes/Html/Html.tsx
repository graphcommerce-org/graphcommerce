import ContentTypeFactory from '../../factory'
import handleHtmlContentClick from '../../handleHtmlContentClick'
import PageBuilder from '../../pagebuilder'
import { extractAdvancedProps } from '../../utils'
import { HtmlContentType } from './types'

/**
 * Page Builder HTML component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Html: HtmlContentType['component'] = (props) => {
  const [cssProps, cssClasses, isHidden, additional] = extractAdvancedProps(props)
  const { content } = additional

  // const history = useHistory()

  // const clickHandler = (event) => {
  //   handleHtmlContentClick(history, event)
  // }

  return (
    <>
      {content.map((contentItem) => {
        if (!contentItem) return null
        if (typeof contentItem === 'string') {
          return (
            <div
              className='ContentType-html'
              style={cssProps}
              dangerouslySetInnerHTML={{ __html: contentItem }}
              // onClick={clickHandler}
              // onKeyDown={clickHandler}
              role='presentation'
            />
          )
        }

        return (
          <>
            {contentItem.children.map((child, i) => (
              <div className='ContentType-html-children' key={i}>
                <ContentTypeFactory data={child} />
              </div>
            ))}
          </>
        )
      })}
    </>
  )
}
