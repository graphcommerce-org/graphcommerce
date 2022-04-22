import { Heading } from './Heading'
import { headingAggregator } from './headingAggregator'
import { HeadingContentType } from './types'

export const heading: HeadingContentType = {
  configAggregator: headingAggregator,
  component: Heading,
}
