/* eslint-disable import/no-extraneous-dependencies */
import { TextRenderer } from '../../components/TextRenderer/TextRenderer'
import { extractAdvancedProps } from '../../utils'
import { TextProps } from './types'

/**
 * Page Builder Text component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Text = (props: TextProps) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)
  const { textContent } = additional

  return <TextRenderer textContent={textContent} sx={cssProps} />
}
