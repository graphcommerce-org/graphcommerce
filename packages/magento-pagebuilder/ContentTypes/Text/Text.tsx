/* eslint-disable import/no-extraneous-dependencies */
import { TextRenderer } from '../../components/TextRenderer/TextRenderer'
import { extractAdvancedProps } from '../../utils'
import type { TextProps } from './types'

/**
 * Page Builder Text component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export function Text(props: TextProps) {
  const [cssProps, additional] = extractAdvancedProps(props)
  const { textContent } = additional

  return <TextRenderer textContent={textContent} sx={cssProps} />
}
