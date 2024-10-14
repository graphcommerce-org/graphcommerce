import { stripEmpty } from '../../utils'

export type ButtonLinkType = 'product' | 'category' | 'page' | 'default'

type Props = {
  buttonText?: string | null
  buttonType: 'primary' | 'secondary' | 'link'
  link?: string | null
  linkType: ButtonLinkType
  openInNewTab: boolean
}

export type ButtonLinkProps = Partial<Props>

export function getButtonLinkProps(node: HTMLElement): ButtonLinkProps {
  const linkElement = node.querySelector<HTMLElement>('a[data-element="link"]')
  const buttonElement = node.querySelector<HTMLElement>('[data-element="button"]') ?? linkElement

  if (!linkElement || !buttonElement) return {}

  let buttonType: Props['buttonType'] = 'primary'
  if (buttonElement.classList.contains('pagebuilder-button-secondary')) {
    buttonType = 'secondary'
  } else if (buttonElement.classList.contains('pagebuilder-button-link')) {
    buttonType = 'link'
  }

  const isLink = linkElement.nodeName === 'A'

  return stripEmpty({
    buttonText: buttonElement.textContent,
    openInNewTab: linkElement.getAttribute('target') === '_blank',
    buttonType,
    link: isLink ? linkElement.getAttribute('href') : null,
    linkType: isLink
      ? ((linkElement.getAttribute('data-link-type') as ButtonLinkType) ?? 'default')
      : 'default',
  })
}
