import { TypographyProps } from '@mui/material'
import { getAdvanced } from '../../utils'
import { HeadingContentType } from './types'

export const configAggregator: HeadingContentType['configAggregator'] = (node) => ({
  text: node.textContent,
  headingType: node.nodeName.toLowerCase() as NonNullable<TypographyProps['variant']>,
  ...getAdvanced(node),
})
