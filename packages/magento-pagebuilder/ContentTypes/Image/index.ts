import { Image } from './Image'
import { imageAggregator } from './imageAggregator'
import { ImageContentType } from './types'

export const image: ImageContentType = { configAggregator: imageAggregator, component: Image }
