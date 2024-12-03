import type { TypographyProps } from '@mui/material'
import { getAdvanced } from '../../utils'
import type { HeadingContentType } from './types'

export const headingAggregator: HeadingContentType['configAggregator'] = (node) => ({
  text: node.textContent,
  headingType: node.nodeName.toLowerCase() as NonNullable<TypographyProps['variant']>,
  ...getAdvanced(node),
})
