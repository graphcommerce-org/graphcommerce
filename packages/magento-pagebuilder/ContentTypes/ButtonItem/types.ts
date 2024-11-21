import type { ButtonLinkProps } from '../../components/ButtonLink/getButtonLinkProps'
import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps } from '../../utils'

type ButtonItemConfig = ContentTypeConfig<'button-item'>

export type ButtonItemProps = AdvancedProps & ButtonLinkProps

export type ButtonItemContentType = ContentType<ButtonItemConfig, ButtonItemProps>
