import { getAdvanced } from '../../utils'
import type { TabNavigationAlignment, TabsContentType } from './types'

export const tabsAggregator: TabsContentType['configAggregator'] = (node) => {
  const headerElements = node.querySelectorAll<HTMLDivElement>('ul[data-element=navigation] > *')

  const contentEl = node.querySelector<HTMLElement>('div[data-element=content]')

  const alignmentMatch = /tab-align-([a-zA-Z]*)/.exec(node.getAttribute('class') ?? '')

  return {
    defaultIndex: Number(node.getAttribute('data-active-tab')),
    minHeight: contentEl?.style.minHeight,
    tabNavigationAlignment: (alignmentMatch ? alignmentMatch[1] : 'left') as TabNavigationAlignment,
    headers: [...headerElements].map((el) => el.textContent).filter(Boolean) as string[],
    ...getAdvanced(node),
  }
}
