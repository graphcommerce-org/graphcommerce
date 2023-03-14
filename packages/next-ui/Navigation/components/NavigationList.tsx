import { styled } from '@mui/material/styles'
import React from 'react'
import { extendableComponent } from '../../Styles/extendableComponent'
import { NavigationNode } from '../hooks/useNavigation'
import { NavigationItem, mouseEventPref } from './NavigationItem'

const NavigationUList = styled('ul')({
  display: 'block',
  position: 'absolute',
  left: '-10000px',
  top: '-10000px',
  '&.selected': {
    display: 'contents',
  },
})

type NavigationItemsProps = {
  parentPath?: string
  items: NavigationNode[]
  selected?: boolean
} & mouseEventPref

type OwnerState = {
  column: number
  selected: boolean
}

const name = 'NavigationList'
const parts = ['root'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export const NavigationList = React.memo<NavigationItemsProps>((props) => {
  const { items, parentPath = '', selected = false, mouseEvent } = props

  const classes = withState({ column: 0, selected })
  return (
    <NavigationUList className={classes.root}>
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
})

if (process.env.NODE_ENV !== 'production') {
  NavigationList.displayName = 'NavigationList'
}
