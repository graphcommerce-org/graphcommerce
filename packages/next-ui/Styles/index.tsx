export type UseStyles<T extends (...args: never[]) => unknown> = {
  classes?: Partial<ReturnType<T>>
}

export * from './breakpointVal'
export * from './responsiveVal'
export * from './classesPicker'
export * from './withTheme'
