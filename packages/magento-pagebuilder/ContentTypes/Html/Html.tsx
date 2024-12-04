import { PagebuilderRender } from '../../components/Pagebuilder/PagebuilderRender'
import { extractAdvancedProps } from '../../utils'
import type { HtmlContentType } from './types'

/**
 * Page Builder HTML component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Html: HtmlContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)
  const { content } = additional

  return (
    <>
      {content?.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PagebuilderRender contentItem={child} key={index} />
      ))}
    </>
  )
}
