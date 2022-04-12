import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type ButtonsConfig = ContentTypeConfig<'buttons'> & {
  appearance: 'stacked' | 'inline'
}

export type ButtonsProps = AdvancedProps & {
  isSameWidth: boolean
}

export type ButtonsContentType = ContentType<ButtonsConfig, ButtonsProps>
