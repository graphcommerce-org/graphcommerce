/**
 * Consider moving to the `sx` prop with `selectors`
 *
 * @deprecated
 */
export type UseStyles<T extends (...args: never[]) => unknown> = {
  classes?: Partial<ReturnType<T>['classes']>
}

export * from './breakpointVal'
export * from './responsiveVal'
export * from './classesPicker'
export * from './withTheme'
export * from './tssReact'
export * from './component'
