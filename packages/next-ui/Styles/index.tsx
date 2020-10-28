export type UseStyles<T extends (...args: never[]) => unknown> = {
  classes?: Partial<ReturnType<T>>
}
