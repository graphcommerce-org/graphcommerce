import { TypographyProps } from '@mui/material/Typography'
import { getAdvanced } from '../../utils'
import { HeadingContentType } from './types'

export const headingAggregator: HeadingContentType['configAggregator'] = (node) => ({
  text: node.textContent,
  headingType: node.nodeName.toLowerCase() as NonNullable<TypographyProps['variant']>,
  ...getAdvanced(node),
})
