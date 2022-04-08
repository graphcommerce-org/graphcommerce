import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type ButtonItemConfig = ContentTypeConfig<'button-item'>

export type ButtonLinkType = 'product' | 'category' | 'page' | 'default'

export type ButtonItemProps = AdvancedProps & {
  text: string | null
  buttonType: 'primary' | 'secondary' | 'link'
  link: string | null
  linkType: ButtonLinkType
  openInNewTab: boolean
}

export type ButtonItemContentType = ContentType<ButtonItemConfig, ButtonItemProps>
