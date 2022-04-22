import { Text } from './Text'
import { textAggregator } from './textAggregator'
import { TextContentType } from './types'

export const text: TextContentType = {
  configAggregator: textAggregator,
  component: Text,
}
