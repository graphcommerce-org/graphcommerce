/* eslint-disable no-case-declarations */
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

type ItemState = {
  left: number
  top: number
  width: number
  height: number
  active: boolean
}

type State = {
  items: { [idx: number]: ItemState }
}

type UpdateItemAction = { type: 'UPDATE_ITEM'; idx: number } & ItemState
type NavigateAction = { type: 'NAVIGATE'; select: number }
type NavigateNextAction = { type: 'NAVIGATE_NEXT' }
type NavigatePrevAction = { type: 'NAVIGATE_PREV' }

type Actions = UpdateItemAction | NavigateAction | NavigateNextAction | NavigatePrevAction

type SliderReducer = Reducer<State, Actions>

type SliderCtx = [ReducerState<SliderReducer>, Dispatch<ReducerAction<SliderReducer>>]

const contexts: {
  [scope: string]: Context<SliderCtx>
} = {}

const reducer: SliderReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'UPDATE_ITEM':
      const { type, idx, ...actionData } = action
      return { ...state, items: { ...state.items, [idx]: actionData } }
    default:
      return state
  }
}

export type ScrollSnapSliderProviderProps = PropsWithChildren<{
  /**
   * To create a named context (to access elsewhere)
   */
  scope: string
}>

export function SliderContext(props: ScrollSnapSliderProviderProps) {
  const { children, scope } = props
  const value = useReducer<SliderReducer>(reducer, { items: [] })

  if (!contexts[scope]) {
    contexts[scope] = createContext(value)
    contexts[scope].displayName = 'ScrollSnapSliderContext'
  }

  const { Provider } = contexts[scope]
  return <Provider value={value}>{children}</Provider>
}

export function useSliderContext(scope: string) {
  const value = useReducer<SliderReducer>(reducer, { items: [] })

  if (!contexts[scope]) {
    contexts[scope] = createContext(value)
    contexts[scope].displayName = 'ScrollSnapSliderContext'
  }

  return useContext(contexts[scope])
}
