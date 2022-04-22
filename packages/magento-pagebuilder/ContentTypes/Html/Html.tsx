import { RenderChildren } from '../../components/RenderChildren/RenderChildren'
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

  if (isHidden) return null

  return <RenderChildren content={content} />
}
