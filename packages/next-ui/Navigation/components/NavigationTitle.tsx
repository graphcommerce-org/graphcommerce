import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { Trans } from '@lingui/react'
import type {
  NavigationPath,
  NavigationNodeHref,
  NavigationNodeButton,
} from '../hooks/useNavigation'
import { useNavigation } from '../hooks/useNavigation'

function findCurrent(
  items,
  selected: NavigationPath | false,
): NavigationNodeHref | NavigationNodeButton | undefined {
  if (selected === false) return undefined
  const lastItem = selected.slice(-1)[0]

  if (!lastItem) return undefined

  let result
  for (const item of items) {
    if (item.id === lastItem) {
      result = item
      break
    }
    if (item.childItems) {
      result = findCurrent(item.childItems, selected)
      if (result) {
        break
      }
    }
  }
  return result
}

export function NavigationTitle() {
  const { selection, items } = useNavigation()
  return (
    <>{useMotionValueValue(selection, (v) => findCurrent(items, v))?.name ?? <Trans id='Menu' />}</>
  )
}
