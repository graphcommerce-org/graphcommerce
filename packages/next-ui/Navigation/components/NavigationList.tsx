import { styled } from '@mui/material'
import { extendableComponent } from '../../Styles/extendableComponent'
import { NavigationNode, NavigationPath } from '../hooks/useNavigation'
import { NavigationItem } from './NavigationItem'

const NavigationUList = styled('ul')({})

type NavigationItemsProps = {
  parentPath?: NavigationPath
  items: NavigationNode[]
  selected?: boolean
} & { mouseEvent: 'click' | 'hover' }

type OwnerState = {
  column: number
}

const name = 'NavigationList'
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

// const componentName = 'NavigationItem'
// const parts = ['li', 'ul', 'item'] as const

export function NavigationList(props: NavigationItemsProps) {
  const { items, parentPath = [], selected = false, mouseEvent } = props

  return (
    <NavigationUList
      sx={[
        { display: 'block', position: 'absolute', left: '-10000px', top: '-10000px' },
        selected && { display: 'contents' },
      ]}
      className={withState({ column: 0 }).root}
    >
      {items.map((item, idx) => (
        <NavigationItem
          NavigationList={NavigationList}
          key={item.id}
          {...item}
          parentPath={parentPath}
          idx={idx}
          first={idx === 0}
          last={idx === items.length - 1}
          column={0}
          mouseEvent={mouseEvent}
        />
      ))}
    </NavigationUList>
  )
}
