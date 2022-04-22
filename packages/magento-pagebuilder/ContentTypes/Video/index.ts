import { Video } from './Video'
import { VideoContentType } from './types'
import { videoAggregator } from './videoAggregator'

export const video: VideoContentType = { configAggregator: videoAggregator, component: Video }
