export type UseStyles<T extends (...args: never[]) => unknown> = {
  classes?: Partial<ReturnType<T>>
}

export type HTMLElementShade = 'muted' | 'default' | 'inverted'

/** Invert HTMLElement colours using CSS "filter: invert({value}%)" */
export const HTMLElementShades: Record<HTMLElementShade, number> = {
  muted: 75,
  default: 0,
  inverted: 100,
}
