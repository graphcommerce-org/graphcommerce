import { Buttons } from './Buttons'
import { buttonsAggregator } from './buttonsAggregator'
import { ButtonsContentType } from './types'

export const buttons: ButtonsContentType = {
  configAggregator: buttonsAggregator,
  component: Buttons,
}
