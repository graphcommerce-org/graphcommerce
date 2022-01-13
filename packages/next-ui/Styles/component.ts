import { Interpolation, Theme } from '@mui/material'
import { OverridesStyleRules } from '@mui/material/styles/overrides'

/** Maps incoming classes to a selectors that can be used to extend the component */
export const toSelectors = <O extends Record<string, string>>(
  obj: O,
): {
  [P in keyof O]: `& .${O[P]}`
} => {
  const mapped = Object.entries(obj).map(([target, className]) => [target, `& .${className}`])
  return Object.fromEntries(mapped)
}

export type ExtendableComponent<
  StyleProps extends Record<string, unknown>,
  ClassKeys extends string,
> = {
  defaultProps?: Partial<StyleProps>
  styleOverrides?: Partial<OverridesStyleRules<ClassKeys>>
  variants?: { props: Partial<StyleProps>; style: Interpolation<{ theme: Theme }> }[]
}
