/* eslint-disable no-case-declarations */
import { deepStrictEqual } from 'assert'
import { AnimationControls, useAnimation } from 'framer-motion'
import React, {
  Context,
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  ReducerAction,
  ReducerState,
  useContext,
  useReducer,
} from 'react'

type Item = {
  left: number
  top: number
  width: number
  height: number
  active: boolean
}

type State = {
  items: { [idx: number]: Item }
  count: number
  firstItem?: Item
  lastItem?: Item
  controls: AnimationControls
}

type UpdateItemAction = {
  type: 'UPDATE_ITEM'
  idx: number
  rect: DOMRect
  parentRect: DOMRect
  active: boolean
}
type NavigateAction = { type: 'NAVIGATE'; to: number }
type NavigateNextAction = { type: 'NAVIGATE_NEXT' }
type NavigatePrevAction = { type: 'NAVIGATE_PREV' }

type Actions = UpdateItemAction | NavigateAction | NavigateNextAction | NavigatePrevAction

type SliderReducer = Reducer<State, Actions>

type SliderCtx = [ReducerState<SliderReducer>, Dispatch<ReducerAction<SliderReducer>>]

const contexts: {
  [scope: string]: Context<SliderCtx>
} = {}

const reducer: SliderReducer = (state: State, action: Actions): State => {
  let newState = state
  let item: Item

  switch (action.type) {
    case 'UPDATE_ITEM':
      const curr = state.items[action.idx]
      item = {
        top: Math.abs(Math.round(action.rect.top - action.parentRect.top)),
        left: Math.abs(Math.round(action.rect.left - action.parentRect.left)),
        width: Math.round(action.rect.width),
        height: Math.round(action.rect.height),
        active: action.active,
      }

      const changed = !curr || Object.keys(curr).find((key) => curr[key] !== item[key])
      if (!changed) return state
      newState = { ...state, items: { ...state.items, [action.idx]: item } }
      break
    case 'NAVIGATE_NEXT':
      ;(() => {
        const items = Object.values(state.items).slice().reverse()
        const currentItem = items.findIndex((i) => i.active)
        item = items[currentItem - 1]

        // todo: Make sure we handle the snap align property
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({
          x: item.left * -1,
          transition: {
            type: 'spring',
            stiffness: 200,
            mass: 1,
            damping: 20,
          },
        })
      })()
      break
    case 'NAVIGATE_PREV':
      ;(() => {
        const items = Object.values(state.items).slice().reverse()
        const currentItem = items.findIndex((i) => i.active)
        item = items[currentItem + 1]

        // todo: Make sure we handle the snap align property
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({
          x: item.left * -1,
          transition: {
            type: 'spring',
            stiffness: 200,
            mass: 1,
            damping: 20,
          },
        })
      })()
      break
    case 'NAVIGATE':
      ;(() => {
        item = state.items[action.to]

        // todo: Make sure we handle the snap align property
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({
          x: item.left * -1,
          transition: {
            type: 'spring',
            stiffness: 200,
            mass: 1,
            damping: 20,
          },
        })
      })()
  }

  // Check if we need to update the firstItem/lastItem and count
  const items = Object.values(newState.items)
  const firstItem = items?.[0]
  const lastItem = items?.[items.length - 1]

  const isUnchanged =
    newState.firstItem === firstItem &&
    lastItem === newState.lastItem &&
    items.length === state.count

  return isUnchanged ? newState : { ...newState, firstItem, lastItem, count: items.length }
}

export type ScrollSnapSliderProviderProps = PropsWithChildren<{
  /**
   * To create a named context (to access elsewhere)
   */
  scope: string
}>

function useSliderContextFactory(scope: string) {
  const control = useAnimation()
  const initial = useReducer<SliderReducer>(reducer, { items: {}, controls: control, count: 0 })

  if (!contexts[scope]) {
    contexts[scope] = createContext(initial)
    contexts[scope].displayName = 'ScrollSnapSliderContext'
  }

  return [contexts[scope], initial] as const
}

export function useSliderContext(scope: string) {
  const [context] = useSliderContextFactory(scope)
  return useContext(context)
}

export function SliderContext(props: ScrollSnapSliderProviderProps) {
  const { children, scope } = props
  const [context, initital] = useSliderContextFactory(scope)

  const { Provider } = context
  return <Provider value={initital}>{children}</Provider>
}
