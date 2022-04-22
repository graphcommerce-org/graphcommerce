import { ButtonItem } from './ButtonItem'
import { buttonItemAggregator } from './buttonItemAggregator'
import { ButtonItemContentType } from './types'

export const buttonItem: ButtonItemContentType = {
  configAggregator: buttonItemAggregator,
  component: ButtonItem,
}
