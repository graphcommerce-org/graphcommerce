import { getAdvanced, isHTMLElement } from '../../utils'
import { ButtonItemContentType, ButtonItemProps, ButtonLinkType } from './types'

export const configAggregator: ButtonItemContentType['configAggregator'] = (node) => {
  const { firstChild } = node

  if (!firstChild || !isHTMLElement(firstChild))
    throw Error('First child should be an html element')

  let buttonType: ButtonItemProps['buttonType'] = 'primary'
  if (firstChild.classList.contains('pagebuilder-button-secondary')) {
    buttonType = 'secondary'
  } else if (firstChild.classList.contains('pagebuilder-button-link')) {
    buttonType = 'link'
  }

  const isLink = firstChild.nodeName === 'A'

  return {
    text: node.textContent,
    openInNewTab: firstChild.getAttribute('target') === '_blank',
    ...getAdvanced(firstChild),
    buttonType,
    link: isLink ? firstChild.getAttribute('href') : null,
    linkType: isLink
      ? (firstChild.getAttribute('data-link-type') as ButtonLinkType) ?? 'default'
      : 'default',
  }
}
