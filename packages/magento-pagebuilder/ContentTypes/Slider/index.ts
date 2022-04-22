import { Slider } from './Slider'
import { sliderAggregator } from './sliderAggregator'
import { SliderContentType } from './types'

export const slider: SliderContentType = { configAggregator: sliderAggregator, component: Slider }
