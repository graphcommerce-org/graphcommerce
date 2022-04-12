import { ButtonLinkProps } from '../../components/ButtonLink/getButtonLinkProps'
import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type ButtonItemConfig = ContentTypeConfig<'button-item'>

export type ButtonItemProps = AdvancedProps & ButtonLinkProps

export type ButtonItemContentType = ContentType<ButtonItemConfig, ButtonItemProps>
