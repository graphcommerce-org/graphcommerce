import { getButtonLinkProps } from '../../components/ButtonLink/getButtonLinkProps'
import { getAdvanced, isHTMLElement } from '../../utils'
import { ButtonItemContentType } from './types'

export const configAggregator: ButtonItemContentType['configAggregator'] = (node) => {
  const { firstChild } = node

  if (!firstChild || !isHTMLElement(firstChild))
    throw Error('First child should be an html element')

  return {
    ...getAdvanced(firstChild),
    ...getButtonLinkProps(node),
  }
}
