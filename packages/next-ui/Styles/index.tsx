/**
 * Consider moving to the `sx` prop with `selectors`
 *
 * @deprecated
 */
export type UseStyles<T extends (...args: never[]) => unknown> = {
  classes?: Partial<ReturnType<T>['classes']>
}

export * from './breakpointVal'
export * from './EmotionProvider'
export * from './extendableComponent'
export * from './responsiveVal'
export * from './withEmotionCache'
export * from './withTheme'
