import { Banner } from './Banner'
import { bannerAggregator } from './bannerAggregator'
import { BannerContentType } from './types'

export const banner: BannerContentType = {
  configAggregator: bannerAggregator,
  component: Banner,
}
